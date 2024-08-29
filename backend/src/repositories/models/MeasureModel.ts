import mongoose from 'mongoose';

const MeasureSchema = new mongoose.Schema({
    customer_code: { type: String, required: true, ref: 'Customer' },
    id: { type: String, required: true },
    measure_identification: { type: String, required: true },
    type: { type: String, required: true },
    value: { type: Number, required: true },
    image_url: { type: String, required: true },
    has_confirmed: { type: Boolean, default: false },
    created_at: { type: Date, required: true },
});

export default mongoose.model('Measure', MeasureSchema);
