import mongoose from "mongoose";

const connect = (): Promise<typeof mongoose> => {
    return mongoose.connect('mongodb://127.0.0.1:27017/shopper');
};

const disconnect = (): Promise<void> => {
    return mongoose.disconnect();
};

export { connect, disconnect };