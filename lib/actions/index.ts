"use server";

import { revalidatePath } from "next/cache";
import Product from "../models/product.mondel";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";

export async function scrapeAndStoreProduct({
  productUrl,
}: {
  productUrl: string;
}) {
  if (!productUrl) {
    return;
  }

  try {
    connectToDB();
    console.log("sss");
    const scrapedProduct = await scrapeAmazonProduct({ url: productUrl });
    if (!scrapedProduct) return;

    let product = scrapedProduct;
    const existingProduct = await Product.findOne({
      url: scrapedProduct.url,
    });

    if (existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice, date: new Date() },
      ];

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice({ priceList: updatedPriceHistory }),
        highestPrice: getHighestPrice({ priceList: updatedPriceHistory }),
        averagePrice: getAveragePrice({ priceList: updatedPriceHistory }),
      };
    }

    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true }
    );

    console.log(newProduct);

    revalidatePath(`/products/${newProduct._id}`);
  } catch (error: any) {
    console.log(error);
    throw new Error(`Failed to create/update product ${error.message}`);
  }
}

export async function getProductById({ productId }: { productId: string }) {
  try {
    connectToDB();
    const product = await Product.findOne({ _id: productId });
    if (!product) return null;
    return product;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Failed to create/update product ${error.message}`);
  }
}

export async function getAllProducts() {
  try {
    connectToDB();
    const products = await Product.find();
    return products;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Failed to create/update product ${error.message}`);
  }
}
