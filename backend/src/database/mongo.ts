import {MongoClient as Mongo, Db} from 'mongodb'
export const MongoClient = {
    client:undefined as unknown as Mongo,
    db: undefined as unknown as Db,

    async connect():Promise<void>{
        const uri = String(process.env.URI_MONGO)
        const username = ''
        const password = ''

        const client = new Mongo(uri)
        const db = client.db('customers-db')
        this.client = client
        this.db = db
        console.log('Connected to MongoDB!')
    }

}