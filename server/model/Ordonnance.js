import mongoose from "mongoose";
const Schema =mongoose.Schema;

const ordonnanceSchema = new Schema({
    Matricule:{
        type:String,
        required: true
    },
    Medicaments:{
        medicament:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Medicament',
            required: true
        }
    },
    Prix_Total:{
        type:Number,
        required: true
    },
    Date_Ajout:{
        type:Date,
        required: true
    },
    Id_Benificiaire:{
        type:Number,
        required: true
    },
});
export default mongoose.model('Ordonnance',ordonnanceSchema);