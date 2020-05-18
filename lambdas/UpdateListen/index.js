
const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = process.env.RUSSELL_WORK_MONGODB_URI; // or Atlas connection string

const subscriptions = {};
var crypto = require("crypto");
const webpush = require("web-push");

let cachedDb = null;

const errorHandler = err => {
    console.log('=> an error occurred: ', err);
    return { statusCode: 500, body: 'EEK! ERROR' };
  };

const storeSubscription = async (db, subscriptionData) => {
    return await db
      .collection('alert_subscriptions')
      .insertOne(subscriptionData)
      .catch(errorHandler);
  };

async function connectToDatabase() {
    const uri = MONGODB_URI;
    console.log('=> connect to database');
  
    if (cachedDb) {
      console.log('=> using cached database instance');
      return Promise.resolve(cachedDb);
    }
  
    if (uri) {
      const connection = await MongoClient.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
      console.log('=> creating a new connection');
      cachedDb = connection.db('russell_work');
      return Promise.resolve(cachedDb);
    }
    throw Error('Create a .env with RUSSELL_WORK_MONGODB_URI');
  }




const executeMongo = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    let body = {};
    if (event.body !== null && event.body !== undefined) {
        body = JSON.parse(event.body)
    }

    console.log('event: ', event);
    console.log(body)
    const db = await connectToDatabase();

    handlePushNotificationSubscription(db, body)
};



const vapidKeys = {
    privateKey: "bdSiNzUhUP6piAxLH-tW88zfBlWWveIx0dAsDO66aVU",
    publicKey: "BIN2Jc5Vmkmy-S3AUrcMlpKxJpLeVRAfu9WBqUbJ70SJOCWGCGXKY-Xzyh7HDr6KbRDGYHjqZ06OcS3BjD7uAm8"
};

webpush.setVapidDetails("mailto:russell@deephire.com", vapidKeys.publicKey, vapidKeys.privateKey);

function createHash(input) {
    const md5sum = crypto.createHash("md5");
    md5sum.update(Buffer.from(input));
    return md5sum.digest("hex");
}

function handlePushNotificationSubscription(db, subscriptionRequest) {
    const susbscriptionId = createHash(JSON.stringify(subscriptionRequest));
    // subscriptions[susbscriptionId] = subscriptionRequest;
    console.log(subscriptionRequest)
    storeSubscription(db, subscriptionRequest)
    return { status: 201, body: JSON.stringify({ id: susbscriptionId }) }
}

function sendPushNotification(req) {
    const subscriptionId = req.params.id;
    const pushSubscription = subscriptions[subscriptionId];
    webpush
        .sendNotification(
            pushSubscription,
            JSON.stringify({
                title: "New Product Available ",
                text: "HEY! Take a look at this brand new t-shirt!",
                image: "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg",
                tag: "new-product",
                url: "/new-product-jason-leung-HM6TMmevbZQ-unsplash.html"
            })
        )
        .catch(err => {
            console.log(err);
        });

    return { status: 202, body: JSON.stringify({}) }

}
module.exports.handler = executeMongo

// executeMongo({body: {city: 'Hammondsville', state: "Ohio"}}, {}, {})
