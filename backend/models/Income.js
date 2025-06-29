import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema({
   userId:{
    type:mongoose.Schema.Types.ObjectId,
    required: true, 
    ref:'User'
   },
    amount: {
        type: Number,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Income = mongoose.model('Income',IncomeSchema);
export default Income;
