import axios from "axios";
import * as cheerio from "cheerio";
import { extractPrice } from "../utils";

export async function scrapeAmazonProduct({ url }: { url: string }) {
  if (!url) return;

  const userName = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const sessionId = (1000000 * Math.random()) | 0;
  const options = {
    port,
    host: "brd.superproxy.io",
    auth: {
      username: `${userName}-session-${sessionId}`,
      password,
    },
    rejectUnauthorized: false,
  };

  try {
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);

    const title = $("#productTitle").text().trim();
    const price = extractPrice({ elements });
    console.log(title);
  } catch (error: any) {
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}
