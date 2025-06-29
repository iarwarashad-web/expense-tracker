import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }

})

const Expenses = mongoose.model('Expenses', ExpenseSchema);
export default Expenses;