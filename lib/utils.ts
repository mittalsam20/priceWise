import { PriceHistoryItem } from "@/types";

export function extractPrice({ elements }: { elements: any }) {
  for (const element of elements) {
    const priceText = element.text().trim();

    if (priceText) {
      const cleanPrice = priceText.replace(/[^\d.]/g, "");
      let firstPrice;
      if (cleanPrice) firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0];
      return firstPrice || cleanPrice;
    }
  }
  return "";
}

export function extractCurrency({ element }: { element: any }) {
  const currencyText = element.text().trim().slice(0, 1);
  return currencyText ? currencyText : "";
}

export function extractDescription({ cheerio$: $ }: { cheerio$: any }) {
  const selectors = [".a-unordered-list .a-list-item", ".a-expander-content p"];

  for (const selector of selectors) {
    const elements = $(selector);
    if (elements.length > 0) {
      const textContent = elements
        .map((_: any, element: any) => $(element).text().trim())
        .get()
        .join("\n");
      return textContent;
    }
  }

  return "";
}

export function getHighestPrice({
  priceList,
}: {
  priceList: PriceHistoryItem[];
}) {
  let highestPrice = priceList[0];
  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price > highestPrice.price) {
      highestPrice = priceList[i];
    }
  }

  return highestPrice.price;
}

export function getLowestPrice({
  priceList,
}: {
  priceList: PriceHistoryItem[];
}) {
  let lowestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price < lowestPrice.price) lowestPrice = priceList[i];
  }

  return lowestPrice.price;
}

export function getAveragePrice({
  priceList,
}: {
  priceList: PriceHistoryItem[];
}) {
  const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
  const averagePrice = sumOfPrices / priceList.length || 0;
  return averagePrice;
}

export const formatNumber = ({ num = 0 }: { num: number }) => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};
