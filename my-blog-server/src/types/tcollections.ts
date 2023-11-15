import { Collection } from "mongodb"

export type TCollections = {
    [k: string]: Collection,
};