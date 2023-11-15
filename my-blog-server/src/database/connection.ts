import { MongoClient, Db } from 'mongodb';
import { TCollections } from '../types/tcollections';
import dotenv from 'dotenv';
dotenv.config();

let db: Db;

export const connect = async (fn: Function) => {
    const connection = process.env.MONGODB_CONNECTION;
    
    let mongodbClient: MongoClient | null = null;
    if (!mongodbClient) {
        mongodbClient = new MongoClient(connection ? connection : '');
        mongodbClient.connect();
    }
    const database = process.env.DATABASE;
    db = mongodbClient.db(database ? database : '');
    fn();
};

export const getConnection = async (collectionNames: string[], fn: Function) => {
    const collections: TCollections = {};
    collectionNames.forEach(name => collections[name] = db.collection(name));
    await fn(collections);
};