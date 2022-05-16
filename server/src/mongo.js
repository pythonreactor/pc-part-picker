/*
This file contains all helper functions for creating and fetching objects
within the local mongoDB database.

If a specific data format is needed, it will be noted within the function.
*/

import mongo from 'mongodb';

const mongoClient = mongo.MongoClient;
const mongoUrl = 'mongodb://localhost:27017';

export const getBuilds = ((coll='builds') => {
    return new Promise((resolve, reject) => {
        mongoClient.connect(mongoUrl, (err, client) => {
            if (err) {
                reject(err);
            } else {
                const db = client.db('final-project');
                const collection = db.collection(coll);
                collection.find({}).toArray((err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        client.close();
                        resolve(result);
                    }
                });
            }
        });
    });
});

export const createBuild = ((buildData, coll='builds') => {
    /*
    Data format required:
        {
            "name": "...",
            "description": "...",
        }
    */
    return new Promise((resolve, reject) => {
        mongoClient.connect(mongoUrl, (err, client) => {
            if (err) {
                reject(err);
            } else {
                const db = client.db('final-project');
                const collection = db.collection(coll);

                // Build the new build object
                const build = new Object(buildData);

                collection.insertOne(build, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        client.close();
                        resolve(result);
                    }
                });
            }
        });
    });
});

export const updateBuild = ((buildId, buildData, coll='builds') => {
    return new Promise((resolve, reject) => {
        mongoClient.connect(mongoUrl, (err, client) => {
            if (err) {
                reject(err);
            } else {
                const db = client.db('final-project');
                const collection = db.collection(coll);

                collection.updateOne({_id: new mongo.ObjectID(buildId)}, {$set: buildData}, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        client.close();
                        resolve(result);
                    }
                });
            }
        });
    });
});

export const getComponents = ((coll='components') => {
    return new Promise((resolve, reject) => {
        mongoClient.connect(mongoUrl, (err, client) => {
            if (err) {
                reject(err);
            } else {
                const db = client.db('final-project');
                const collection = db.collection(coll);
                collection.find({}).toArray((err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        client.close();
                        resolve(result);
                    }
                });
            }
        });
    });
});

export const createComponent = ((componentData, coll='components') => {
    /*
    Data format required:
        {
            "name": "...",
            "value": "...",
        }
    */
    return new Promise((resolve, reject) => {
        mongoClient.connect(mongoUrl, (err, client) => {
            if (err) {
                reject(err);
            } else {
                const db = client.db('final-project');
                const collection = db.collection(coll);

                // Build the new build object
                const component = new Object(componentData);

                collection.insertOne(component, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        client.close();
                        resolve(result);
                    }
                });
            }
        });
    });
});

export const getObjectById = ((id, coll) => {
    return new Promise((resolve, reject) => {
        mongoClient.connect(mongoUrl, (err, client) => {
            if (err) {
                reject(err);
            } else {
                const db = client.db('final-project');
                const collection = db.collection(coll);

                collection.find({
                    _id: new mongo.ObjectID(id)
                }).toArray((err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        client.close();
                        resolve(result);
                    }
                });
            }
        });
    });
});
