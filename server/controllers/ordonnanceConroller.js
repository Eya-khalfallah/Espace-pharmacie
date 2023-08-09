const Ordonnance = require ('../model/Ordonnance.js');

const calculerPrixTotal = (medicaments) => {
    let prixTotal = 0;

    for (const medicament of medicaments) {
        prixTotal += medicament.Prix * medicament.Quantite;
    }

    return prixTotal;
};

const getAllOrdonnances = async (req, res) => {
    const ordonnances = await Ordonnance.find();
    if (!ordonnances) return res.status(204).json({ 'message': 'No ordonnances found' });
    res.json(ordonnances);
}

const getOrdonnance = async (req, res) => {
    if (!req?.params?.matricule) return res.status(400).json({ "message": 'Ordonnance metricule required' });
    const ordonnance = await Ordonnance.findOne({ Matricule: req.params.Matricule }).exec();
    if (!ordonnance) {
        return res.status(204).json({ 'message': `Ordonnance matricule ${req.params.matricule} not found` });
    }
    res.json(ordonnance);
}

const createNewOrdonnance = async (req, res) => {
    const { Matricule, Medicaments, Date_Ajout, Id_Benificiaire } = req.body;
    if (!Matricule || !Medicaments || !Date_Ajout || !Id_Benificiaire) return res.status(400).json({ 'message': 'all the chapms are required.' });

    // Calculate the total price
    const prixTotal = calculerPrixTotal(Medicaments);

    // check for duplicate Matricule in the db
    const duplicate = await Ordonnance.findOne({ Matricule: Matricule }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict

    try {
        const result = await Ordonnance.create({
            Matricule: Matricule,
            Medicaments: Medicaments,
            Prix_Total: prixTotal,
            Date_Ajout: Date_Ajout,
            Id_Benificiaire: Id_Benificiaire,
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

module.exports = {
    getAllOrdonnances,
    getOrdonnance,
    createNewOrdonnance,
    deleteOrdonnance
}
