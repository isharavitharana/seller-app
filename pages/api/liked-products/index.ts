import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/mongo/dbConnect';
import Product, { ProductType } from '../../../utils/mongo/Product';

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
        const products = await Product.find({ isLiked: true });
        res.status(200).json({ success: true, data: products });
      } catch (error) {
        res.status(400).json({ success: false, data: [] });
      }
      break;

    default:
      res.status(400).json({ success: false, data: [] });
      break;
  }
}
