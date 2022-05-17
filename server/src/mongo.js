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

                collection.updateOne({name: build.name}, {$set: build}, {upsert: true}, (err, result) => {
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

export const deleteBuild = ((buildId, coll='builds') => {
    return new Promise((resolve, reject) => {
        mongoClient.connect(mongoUrl, (err, client) => {
            if (err) {
                reject(err);
            } else {
                const db = client.db('final-project');
                const collection = db.collection(coll);

                collection.deleteOne({_id: new mongo.ObjectID(buildId)}, (err, result) => {
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

export const associateComponent = ((buildId, componentData, coll='builds') => {
    // Convert all IDs into MongoDB ObjectIDs
    componentData.forEach( (obj) => {obj._id = new mongo.ObjectID(obj._id)});

    return new Promise((resolve, reject) => {
        mongoClient.connect(mongoUrl, (err, client) => {
            if (err) {
                reject(err);
            } else {
                const db = client.db('final-project');
                const collection = db.collection(coll);

                collection.updateOne(
                    {_id: new mongo.ObjectID(buildId)},
                    {$set: {"components": componentData}},
                    (err, result) => {
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

                collection.updateOne({value: component.value}, {$set: component}, {upsert: true}, (err, result) => {
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

export const deleteComponent = ((componentId, coll='components') => {
    return new Promise((resolve, reject) => {
        mongoClient.connect(mongoUrl, (err, client) => {
            if (err) {
                reject(err);
            } else {
                const db = client.db('final-project');
                const collection = db.collection(coll);

                collection.deleteOne({_id: new mongo.ObjectID(componentId)}, (err, result) => {
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
