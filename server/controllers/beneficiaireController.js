const Beneficiaire = require('../model/Beneficiaire')
const Adherent = require('../model/Adherent')

const getAllbeneficiaires = async (req, res) => {
    const beneficiaires = await Beneficiaire.find();
    if (!beneficiaires) return res.status(204).json({ 'message': 'No beneficiaires found' });
    res.json(beneficiaires);
}

const getbeneficiaire = async (req, res) => {
    if (!req?.params?.matricule) return res.status(400).json({ "message": 'beneficiaire metricule required' });
    const beneficiaire = await Beneficiaire.findOne({ matricule: req.params.matricule }).exec();
    if (!beneficiaire) {
        return res.status(204).json({ 'message': `beneficiaire matricule ${req.params.matricule} not found` });
    }
    res.json(matricule);
}

const createNewbeneficiaire = async (req, res) => {
    /* if (!req?.body?.nom || !req?.body?.prénom || !req?.body?.matricule || !req?.body?.sexe || !req?.body?.adresse  || !req?.body?.telephone ) {
        return res.status(400).json({ 'message': 'all the champs are required' });
    } */
    const { adherent, nom, prénom, matricule, sexe, adresse, telephone } = req.body;
    if (!adherent || !nom || !prénom || !matricule || !sexe || !adresse || !telephone ) return res.status(400).json({ 'message': 'all the chapms are required.' });

    const adht = await Adherent.findOne({"matricule": req.body.adherent.matricule}).exec();
    if (!adht) return res.status(400).json({ 'message': 'adherent not found' });

    // check for duplicate usernames in the db
    const duplicate = await Beneficiaire.findOne({ adherent: req.body.adherent, matricule: req.body.matricule }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict

    try {
        const result = await Beneficiaire.create({
            adherent: req.body.adherent,
            nom: req.body.nom,
            prénom: req.body.prénom,
            matricule: req.body.matricule,
            sexe: req.body.sexe,
            adresse: req.body.adresse,
            telephone: req.body.telephone,
        });

        console.log(result)

        res.status(201).json({ 'success': 'New beneficiaire created!' });
    } catch (err) {
        console.error(err);
    }
};

const deletebeneficiaire = async (req, res) => {
    if (!req?.body?.matricule) return res.status(400).json({ "message": 'beneficiaire matricule required' });
    const beneficiaire = await Beneficiaire.findOne({ matricule: req.body.matricule }).exec();
    if (!beneficiaire) {
        return res.status(204).json({ 'message': 'beneficiaire matricule not found' });
    }
    const result = await Beneficiaire.deleteOne({ matricule: req.body.matricule });
    res.json(result);
}

module.exports = {
    getAllbeneficiaires,
    getbeneficiaire,
    createNewbeneficiaire,
    deletebeneficiaire
}