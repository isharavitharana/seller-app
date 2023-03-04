import CardWrapper from '../src/components/CardWrapper';
import Layout from '../src/layouts/Layout';
import dbConnect from '../utils/mongo/dbConnect';
import Product, { ProductType } from '../utils/mongo/Product';

export default function Home({ products }: { products: ProductType[] }) {
  return (
    <Layout title='My Products' description='Liked Products'>
      <CardWrapper fetchedroducts={products} isLikedProducts={true} />
    </Layout>
  );
}
export async function getServerSideProps() {
  // await dbConnect();

  // const result = await Product.find({ isLiked: true });
  // const products = result.map((doc) => {
  //   const product = doc.toObject();
  //   product._id = product._id.toString();
  //   return product;
  // });

  //node js backend
  const API = process.env.NEXT_PUBLIC_API;
  const res = await fetch(`${API}/favourite-products`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const { data } = await res.json();

  return { props: { products: [...data] } };
}
