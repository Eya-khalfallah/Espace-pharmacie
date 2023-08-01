import User from '../model/User.js';
import bcrypt from 'bcrypt';

const handleNewUser = async (req, res) => {
    const { nom, prénom, email, pwd } = req.body;
    if (!nom || !prénom || !email || !pwd) return res.status(400).json({ 'message': 'all the chapms are required.' });
    // check for duplicate usernames in the db

    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the new user
        const result = await User.create( { 
            "nom": nom,
            "prénom": prénom,
            "email": email,
            "password": hashedPwd 
        });

        console.log(result)

        res.status(201).json({ 'success': `New user ${nom,prénom} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

export default { handleNewUser };