"use server";

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
    const scrapedProduct = await scrapeAmazonProduct({ url: productUrl });
  } catch (error: any) {
    throw new Error(`Failed to create/update product ${error.message}`);
  }
}
