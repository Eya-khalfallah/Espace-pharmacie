import Ordonnance from'../model/Ordonnance.js';


const getAllOrdonnances = async (req, res) => {
    const ordonnances = await Ordonnance.find();
    if (!ordonnances) return res.status(204).json({ 'message': 'No ordonnances found' });
    res.json(ordonnances);
}

const getOrdonnance = async (req, res) => {
    if (!req?.params?.matricule) return res.status(400).json({ "message": 'Ordonnance metricule required' });
    const ordonnance = await Ordonnance.findOne({ Matricule: req.params.Matricule }).exec();
    if (!Ordonnance) {
        return res.status(204).json({ 'message': `Ordonnance matricule ${req.params.matricule} not found` });
    }
    res.json(matricule);
}

const createNewOrdonnance = async (req, res) => {
    /* if (!req?.body?.nom || !req?.body?.prénom || !req?.body?.matricule || !req?.body?.sexe || !req?.body?.adresse  || !req?.body?.telephone ) {
        return res.status(400).json({ 'message': 'all the champs are required' });
    } */

    const { Matricule, Medicaments, Prix_Total, Date_Ajout, Id_Benificiaire} = req.body;
    if (!Matricule || !Medicaments || !Prix_Total || !Date_Ajout || !Id_Benificiaire ) return res.status(400).json({ 'message': 'all the chapms are required.' });
    // check for duplicate usernames in the db

    const duplicate = await Ordonnance.findOne({ Matricule: req.body.Matricule }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict

    try {
        const result = await Ordonnance.create({
            Matricule: req.body.Matricule,
            Medicaments: req.body.Medicaments,
            Prix_Total: req.body.Prix_Total,
            Date_Ajout: req.body.Date_Ajout,
            Id_Benificiaire: req.body.Id_Benificiaire,
            
        });

        console.log(result)

        res.status(201).json({ 'success': 'New ordonnance created!' });
    } catch (err) {
        console.error(err);
    }
};

const deleteOrdonnance = async (req, res) => {
    if (!req?.body?.Matricule) {
        return res.status(400).json({ "message": 'Ordonnance matricule required' });
    }

    const ordonnance = await Ordonnance.findOne({ Matricule: req.body.Matricule }).exec();
    if (!ordonnance) {
        return res.status(204).json({ 'message': 'Ordonnance matricule not found' });
    }
    const result = await ordonnance.deleteOne({ Matricule: req.body.Matricule });
    res.json(result);
}

export default {
    getAllOrdonnances,
    getOrdonnance,
    createNewOrdonnance,
    deleteOrdonnance
}