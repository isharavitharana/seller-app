import clientPromise from './mongodb';

let client;
let db;
let products;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = await client.db();
    products = await db.collection('products').then((res) => {
      console.log('sdcs', res);
    });
  } catch (error) {
    throw new Error('Failed to establish connection to database');
  }
}
// (async () => {
//   await init();
// })();

export async function getProducts() {
  console.log('client', client);
  console.log('db', db);
  console.log('products', products);

  try {
    if (!products) await init();
    const result = await products
      .find({})
      .map((product) => ({ ...product, _id: product._id.toString() }))
      .toArray();
    return { products: result };
  } catch (error) {
    return { error: 'Failed to fetch products' };
  }
}
