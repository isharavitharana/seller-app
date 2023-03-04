import React from 'react';
import Layout from '../src/layouts/Layout';
import CardWrapper from '../src/components/CardWrapper';
import dbConnect from '../utils/mongo/dbConnect';
import Product, { ProductType } from '../utils/mongo/Product';

export default function Home({ products }: { products: ProductType[] }) {
  return (
    <Layout title='Home' description='Seller-App Home page'>
      <CardWrapper fetchedroducts={products} isLikedProducts={false} />
    </Layout>
  );
}

export async function getServerSideProps() {
  // await dbConnect();
  /* find all the data in our database */
  // const result = await Product.find({});
  // const products = result.map((doc) => {
  //   const product = doc.toObject();
  //   product._id = product._id.toString();
  //   return product;
  // });

  //node js backend
  const API = process.env.NEXT_PUBLIC_API;
  const res = await fetch(`${API}/products`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const { data } = await res.json();
  return { props: { products: [...data] } };
}
