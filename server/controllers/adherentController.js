const Adherent = require('../model/Adherent.js');
const Beneficiaire = require('../model/Beneficiaire.js');
const beneficiairesController = require('./beneficiaireController.js');

const getAllAdherents = async (req, res) => {
    const adherents = await Adherent.find();
    if (!adherents) return res.status(204).json({ 'message': 'No adherents found' });
    res.json(adherents);
}

const getAdherent = async (req, res) => {
    if (!req?.body?.matricule) return res.status(400).json({ "message": 'Adherent matricule required' });
    const adherent = await Adherent.findOne({ matricule: req.body.matricule }).exec();
    if (!adherent) {
        return res.status(204).json({ 'message': `Adherent matricule ${req.body.matricule} not found` });
    }
    const beneficiaires = await Beneficiaire.find({ adherent: adherent });
    const data = { "adherent": adherent, "beneficiaires": beneficiaires}
    res.json(data);
}

const createNewAdherent = async (req, res) => {
    /* if (!req?.body?.nom || !req?.body?.prénom || !req?.body?.matricule || !req?.body?.sexe || !req?.body?.adresse  || !req?.body?.telephone ) {
        return res.status(400).json({ 'message': 'all the champs are required' });
    } */

    const { nom, prénom, matricule, sexe, adresse, telephone } = req.body;
    if (!nom || !prénom || !matricule || !sexe || !adresse || !telephone ) return res.status(400).json({ 'message': 'all the chapms are required.' });
    // check for duplicate usernames in the db

    const duplicate = await Adherent.findOne({ matricule: req.body.matricule }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict

    try {
        const result = await Adherent.create({
            nom: req.body.nom,
            prénom: req.body.prénom,
            matricule: req.body.matricule,
            sexe: req.body.sexe,
            adresse: req.body.adresse,
            telephone: req.body.telephone,
        });

        console.log(result)

        res.status(201).json({ 'success': 'New adherent created!' });
    } catch (err) {
        console.error(err);
    }
};

const deleteAdherent = async (req, res) => {
    if (!req?.body?.matricule) return res.status(400).json({ "message": 'Adherent matricule required' });
    const adherent = await Adherent.findOne({ matricule: req.body.matricule }).exec();
    if (!adherent) {
        return res.status(204).json({ 'message': `Adherent matricule ${req.body.matricule} not found` });
    }
    const result = await adherent.deleteOne({ matricule: req.body.matricule });
    const beneficiaires = await Beneficiaire.find({ adherent: adherent });
    beneficiaires.forEach(element => {
        element.deleteOne();
    });
    res.status(201).json({ 'success': 'Adherent deleted!' });
}

module.exports = {
    getAllAdherents,
    getAdherent,
    createNewAdherent,
    deleteAdherent
}