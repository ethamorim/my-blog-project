import { Collection, Document, ObjectId, WithId } from "mongodb";
import { DocumentNotFound } from "../../errors/errors";

export const getDocumentById = async (collection: Collection<Document>, id: ObjectId): Promise<WithId<Document>> => {
    const document = await collection.findOne({ _id: id });
    if (!document)
        throw new DocumentNotFound();
    
    return document;
};

export const updateOneById = async (collection: Collection<Document>, id: ObjectId, modifiedObject: { $set: any }): Promise<boolean> => {
    try {
        await collection.updateOne({ _id: id }, modifiedObject);
        return true;
    } catch (error) {
        return false;
    }
}