import mongoose from "mongoose";

const connect = (): Promise<typeof mongoose> => {
    // @ts-ignore
    return mongoose.connect(process.env.URI_MONGODB);
};

const disconnect = (): Promise<void> => {
    return mongoose.disconnect();
};

export { connect, disconnect };