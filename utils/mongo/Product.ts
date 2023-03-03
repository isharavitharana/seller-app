import mongoose, { Schema, model, connect, Model } from 'mongoose';

export interface ProductType {
  _id: string;
  name: string;
  image_url: string;
  price: string;
  description?: string;
  likes?: number;
  // tags?: string[];
  isLiked: boolean;
  seller_name: string;
  seller_id: string;
}

const ProductSchema = new Schema<ProductType>({
  _id: { type: String, required: true },
  name: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  likes: {
    type: Number,
  },
  // tags: {
  //   type: [],
  // },
  isLiked: {
    required: true,
    type: Boolean,
  },
  seller_name: {
    type: String,
    required: true,
  },
  seller_id: {
    type: String,
    required: true,
  },
});

// const Product = mongoose.model('Product', ProductSchema);

// const Product = mongoose.model<ProductType>('Product', ProductSchema);
// export default Product;
export default mongoose.models.Product ||
  mongoose.model('Product', ProductSchema);
