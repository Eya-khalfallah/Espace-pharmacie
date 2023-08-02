import mongoose from "mongoose";
const Schema = mongoose.Schema;

const adherentSchema = new Schema({
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

export default mongoose.model('Adherent', adherentSchema);