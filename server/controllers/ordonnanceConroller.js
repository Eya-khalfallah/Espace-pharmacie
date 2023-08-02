import Ordonnance from'../model/Ordonnance.js';

// Middleware pour obtenir toutes les ordonnances
async function getAllOrdonnances(req, res) {
  try {
    const ordonnances = await Ordonnance.find();
    res.json(ordonnances);
  } catch (err) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des ordonnances.', error: err.message });
  }
}

// Middleware pour créer une nouvelle ordonnance
async function createNewOrdonnance(req, res) {
  try {
    const newOrdonnance = await Ordonnance.create(req.body);
    res.json(newOrdonnance);
  } catch (err) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'ordonnance.', error: err.message });
  }
}

// Middleware pour mettre à jour une ordonnance
async function updateOrdonnance(req, res) {
  try {
    const { id } = req.params;
    const updatedOrdonnance = await Ordonnance.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedOrdonnance);
  } catch (err) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de l\'ordonnance.', error: err.message });
  }
}

// Middleware pour supprimer une ordonnance
async function deleteOrdonnance(req, res) {
  try {
    const { id } = req.params;
    await Ordonnance.findByIdAndRemove(id);
    res.json({ message: 'L\'ordonnance a été supprimée avec succès.' });
  } catch (err) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de l\'ordonnance.', error: err.message });
  }
}

// Middleware pour obtenir une ordonnance par son ID
async function getOrdonnance(req, res) {
  try {
    const { id } = req.params;
    const ordonnance = await Ordonnance.findById(id);
    if (!ordonnance) {
      return res.status(404).json({ message: 'L\'ordonnance demandée est introuvable.' });
    }
    res.json(ordonnance);
  } catch (err) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de l\'ordonnance.', error: err.message });
  }
}

export default {
  getAllOrdonnances,
  createNewOrdonnance,
  updateOrdonnance,
  deleteOrdonnance,
  getOrdonnance
};
