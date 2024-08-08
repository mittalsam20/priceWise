import Product from "@/lib/models/product.model";
import { connectToDB } from "@/lib/mongoose";
import { generateEmailBody, sendEmail } from "@/lib/nodeMailer";
import { scrapeAmazonProduct } from "@/lib/scraper";
import {
  getAveragePrice,
  getEmailNotificationType,
  getHighestPrice,
  getLowestPrice,
} from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    connectToDB();
    const products = await Product.find({});
    if (!products) throw new Error("No products found...!");

    const updatedProducts = await Promise.all(
      products.map(async (currentProduct) => {
        const scrapedProduct = await scrapeAmazonProduct(currentProduct.url);
        if (!scrapedProduct) throw new Error("No product found...!");
        const updatedPriceHistory = [
          ...currentProduct.priceHistory,
          { price: scrapedProduct.currentPrice },
        ];

        const product = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice({ priceList: updatedPriceHistory }),
          highestPrice: getHighestPrice({ priceList: updatedPriceHistory }),
          averagePrice: getAveragePrice({ priceList: updatedPriceHistory }),
        };

        const updatedProduct = await Product.findOneAndUpdate(
          { url: scrapedProduct.url },
          product
        );

        const emailNotificationType = getEmailNotificationType({
          scrapedProduct,
          currentProduct,
        });

        if (emailNotificationType && updatedProduct.users.length > 0) {
          const productInfo = {
            title: updatedProduct.title,
            url: updatedProduct.url,
          };
          // Construct emailContent
          const emailContent = await generateEmailBody({
            product: productInfo,
            type: emailNotificationType,
          });

          const userEmails = updatedProduct.users.map(
            (user: any) => user.email
          );
          await sendEmail({ emailContent, sendTo: userEmails });
        }

        return updatedProduct;
      })
    );

    return NextResponse.json({
      message: "Ok",
      data: updatedProducts,
    });
  } catch (error: any) {
    console.log(error);
    throw new Error(`Failed to create/update product ${error.message}`);
  }
}
