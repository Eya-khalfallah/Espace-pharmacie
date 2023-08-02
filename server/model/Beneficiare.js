import mongoose from "mongoose";
const Schema = mongoose.Schema;

const beneficiaireSchema = new Schema({
    Adherent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Adherent',
        required: true,
    },
    nom: {
        type: String,
        required: true
    },
    prénom: {
        type: String,
        required: true
    },
    matricule: {
        type: String,
        required: true
    },
    sexe: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    }
});

export default mongoose.model('Beneficiaire', beneficiaireSchema);