import  Medicament from'../model/Medicament';

// Middleware pour obtenir tous les médicaments
async function getAllMedicaments(req, res) {
  try {
    const medicaments = await Medicament.find();
    res.json(medicaments);
  } catch (err) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des médicaments.', error: err.message });
  }
}

// Middleware pour mettre à jour un médicament
async function updateMedicament(req, res) {
  try {
    const { id } = req.params;
    const updatedMedicament = await Medicament.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedMedicament);
  } catch (err) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du médicament.', error: err.message });
  }
}

// Middleware pour supprimer un médicament
async function deleteMedicament(req, res) {
  try {
    const { id } = req.params;
    await Medicament.findByIdAndRemove(id);
    res.json({ message: 'Le médicament a été supprimé avec succès.' });
  } catch (err) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du médicament.', error: err.message });
  }
}

// Middleware pour obtenir un médicament par son ID
async function getMedicament(req, res) {
  try {
    const { id } = req.params;
    const medicament = await Medicament.findById(id);
    if (!medicament) {
      return res.status(404).json({ message: 'Le médicament demandé est introuvable.' });
    }
    res.json(medicament);
  } catch (err) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du médicament.', error: err.message });
  }
}

export default  {
  getAllMedicaments,
  updateMedicament,
  deleteMedicament,
  getMedicament,
};
