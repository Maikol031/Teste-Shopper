import { app } from "./app";
import { run } from "./AI/geminiIa";
import { MongoClient } from "./database/mongo";


const PORT = Number(process.env.APP_PORT) || 4000


MongoClient.connect()
app.listen(PORT, async()=> {
    // run()

    console.log('Server on running port', PORT)
})