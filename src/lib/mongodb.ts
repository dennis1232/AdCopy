import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable in .env.local')
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
    // eslint-disable-next-line no-var
    var _mongoClientPromise: Promise<MongoClient>
}

if (!global._mongoClientPromise) {
    client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
}
// eslint-disable-next-line no-var, prefer-const
clientPromise = global._mongoClientPromise

export default clientPromise
