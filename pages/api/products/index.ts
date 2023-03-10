import dbConnect from '../../../utils/mongo/dbConnect';
import Product, { ProductType } from '../../../utils/mongo/Product';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  success: boolean;
  data: ProductType[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const products = await Product.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ success: true, data: products });
      } catch (error) {
        res.status(400).json({ success: false, data: [] });
      }
      break;
    case 'POST':
      try {
        const product = await Product.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: [product] });
      } catch (error) {
        res.status(400).json({ success: false, data: [] });
      }
      break;

    default:
      res.status(400).json({ success: false, data: [] });
      break;
  }
}
