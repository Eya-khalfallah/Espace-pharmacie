import mongoose from "mongoose";
const Schema =mongoose.Schema;

const medicamentSchema = new Schema({
    Code:{
        type:String,
        required: true
    },
    Nom_Medicament:{
        type:String,
        required: true
    },
    Prix:{
        type:Number,
        required: true
    },
  
});
export default mongoose.model('Medicament',medicamentSchema);