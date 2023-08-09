const Medicament = require ('../model/Medicament.js');



const getAllMedicaments = async (req, res) => {
    const medicaments = await Medicament.find();
    if (!medicaments?.length) return res.status(204).json({ 'message': 'No medicaments found' });
    res.json(medicaments);
}

const getMedicament = async (req, res) => {
    if (!req?.params?.matricule) return res.status(400).json({ "message": 'Medicament metricule required' });
    const medicament = await Medicament.findOne({ Code: req.params.Code }).exec();
    if (!Medicament) {
        return res.status(204).json({ 'message': `Medicament code ${req.params.Code} not found` });
    }
    res.json(Code);
}

const createNewMedicament = async (req, res) => {
    /* if (!req?.body?.nom || !req?.body?.prénom || !req?.body?.matricule || !req?.body?.sexe || !req?.body?.adresse  || !req?.body?.telephone ) {
        return res.status(400).json({ 'message': 'all the champs are required' });
    } */

    const { Code, Nom_Medicament, Prix, Quantite} = req.body;
    if (!Code || !Nom_Medicament || !Prix || !Quantite ) return res.status(400).json({ 'message': 'all the chapms are required.' });
    // check for duplicate usernames in the db

    const duplicate = await Medicament.findOne({ Code: req.body.Code }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict

    try {
        const result = await Medicament.create({
            Code: req.body.Code,
            Nom_Medicament: req.body.Nom_Medicament,
            Prix: req.body.Prix,
            Quantite: req.body.Quantite,
           
        });

        console.log(result)

        res.status(201).json({ 'success': 'New medicament created!' });
    } catch (err) {
        console.error(err);
    }
};

const deleteMedicament = async (req, res) => {
    if (!req?.body?.Code) {
        return res.status(400).json({ "message": 'Medicament Code required' });
    }

    const medicament = await Medicament.findOne({ Code: req.body.Code }).exec();
    if (!medicament) {
        return res.status(204).json({ 'message': 'Medicament Code not found' });
    }
    const result = await medicament.deleteOne({ Code: req.body.Code });
    res.json(result);
}

module.exports = {
    getAllMedicaments,
    getMedicament,
    createNewMedicament,
    deleteMedicament
}