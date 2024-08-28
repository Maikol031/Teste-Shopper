import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
    customer_code: { type: String, required: true, unique: true },
});

export default mongoose.model('Customer', CustomerSchema);