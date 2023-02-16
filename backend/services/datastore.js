import fs from "fs";
import { Datastore } from "@google-cloud/datastore";

const datastoreKey = JSON.parse(
    fs.readFileSync("/etc/secrets/datastore-key.json", "utf-8")
);
// Create a client
const datastore = new Datastore({
    projectId: datastoreKey.project_id,
    credentials: datastoreKey,
});

export const write = async (kind, data, name) => {
    try {
        const entityKey = datastore.key([kind, name]);

        const entity = {
            key: entityKey,
            data,
        };
        await datastore.save(entity);
    } catch (error) {
        throw error;
    }
};

export const read = async (kind, filter) => {
    try {
        const query = datastore.createQuery(kind).filter("token", "=", filter);

        const result = await datastore.runQuery(query);
        return result[0];
    } catch (error) {
        throw error;
    }
};

export const destroy = async (kind, name) => {
    try {
        const entityKey = datastore.key([kind, name]);
        await datastore.delete(entityKey);
    } catch (error) {
        throw error;
    }
};
