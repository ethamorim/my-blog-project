import { MongoClient } from 'mongodb';
import { TCollections } from '../types/tcollections';
import dotenv from 'dotenv';
dotenv.config();

const connect = async () => {
    const connection = process.env.MONGODB_CONNECTION;
    
    let mongodbClient: MongoClient | null = null;
    if (!mongodbClient) {
        mongodbClient = new MongoClient(connection ? connection : '');
        mongodbClient.connect();
    };
    
    const database = process.env.DATABASE;
    return mongodbClient.db(database ? database : '');
};

export const getConnection = async (collectionNames: string[], fn: Function) => {
    const db = await connect();
    const collections: TCollections = {};
    collectionNames.forEach(name => collections[name] = db.collection(name));
    await fn(collections);
};