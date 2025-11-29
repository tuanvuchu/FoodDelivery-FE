import { doReadNumber, ReadingConfig } from "read-vietnamese-number";

export default function ReadVietnameseNumber(price: string | number): string {
  const config = new ReadingConfig();
  config.unit = ["đồng"];

  try {
    return (
      doReadNumber(config, price.toString()).charAt(0).toUpperCase() +
      doReadNumber(config, price.toString()).slice(1)
    );
  } catch (error) {
    console.error(error);
    return "";
  }
}
