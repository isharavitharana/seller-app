// import { MongoClient } from 'mongodb';

// const URI = process.env.MONGODB_URI;
// const options = {};

// if (!URI) throw new Error('Please add your Mongo URI to .env');

// let client = new MongoClient(URI, options);
// let clientPromise;

// if (process.env.NODE_ENV !== 'production') {
//   if (!global._mongoClientPromise) {
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   clientPromise = client.connect();
//   console.log('clientPromise', clientPromise);
// }

// export default clientPromise;

import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client
      .connect()
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((err) => {
        console.error(`MongoDB connection error. ${err}`);
      });
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client
    .connect()
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error(`MongoDB connection error. ${err}`);
    });
}
console.log('MongoC', client);

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
