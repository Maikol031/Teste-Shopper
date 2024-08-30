import { app } from "./app";
import { connect } from './db/MongooseClient';

const PORT = Number(process.env.APP_PORT) || 4000;

app.listen(PORT, async () => {
    await connect();
    console.log('Server on running port', PORT);
});