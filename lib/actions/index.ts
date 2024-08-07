"use server";

import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";

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
    const scrapedProduct = await scrapeAmazonProduct({ url: productUrl });
    if (!scrapedProduct) return;

    let product = scrapedProduct;
    // const existingProduct=await
  } catch (error: any) {
    throw new Error(`Failed to create/update product ${error.message}`);
  }
}
