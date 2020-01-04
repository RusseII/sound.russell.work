"use strict";
const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = process.env.RUSSELL_WORK_MONGODB_URI; // or Atlas connection string

let cachedDb = null;

function connectToDatabase(uri) {
    console.log('=> connect to database');

    if (cachedDb) {
        console.log('=> using cached database instance');
        return Promise.resolve(cachedDb);
    }

    return MongoClient.connect(uri)
        .then(db => {
            console.log('=> creating a new connection');
            cachedDb = db.db('russell_work');
            return cachedDb;
        });
}

async function queryDatabase(db, body) {
    const { city, state } = body

    console.log('=> query database');


    db.collection('sound_log').insert(body)
       


    await db.collection('sound').update(
        { city, state },
        { $inc: { seconds: 1 } },
        {
            upsert: true

        })

    return db.collection('sound').find({}).toArray()
        .then((result) => {  
            console.log(result) 
            return { statusCode: 200, body: JSON.stringify(result) }; })
        .catch(err => {
            console.log('=> an error occurred: ', err);
            return { statusCode: 500, body: 'error' };
        });
}


const executeMongo = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    let body = {};
    if (event.body !== null && event.body !== undefined) {
    body = JSON.parse(event.body)
    }

    console.log('event: ', event);
    console.log(body)

    connectToDatabase(MONGODB_URI)
        .then(db => queryDatabase(db, body))
        .then(result => {
            console.log('=> returning result: ', result);
            callback(null, result);
        })
        .catch(err => {
            console.log('=> an error occurred: ', err);
            callback(err);
        });
};
module.exports.handler = executeMongo

// executeMongo({body: {city: 'Hammondsville', state: "Ohio"}}, {}, {})
