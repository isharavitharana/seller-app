import dbConnect from '../../../utils/mongo/dbConnect';
import Product, { ProductType } from '../../../utils/mongo/Product';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  success: boolean;
  data: ProductType;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'PUT':
      try {
        const product = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!product) {
          return res
            .status(400)
            .json({ success: false, data: {} as ProductType });
        }
        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false, data: {} as ProductType });
      }
      break;

    default:
      res.status(400).json({ success: false, data: {} as ProductType });
      break;
  }
}
