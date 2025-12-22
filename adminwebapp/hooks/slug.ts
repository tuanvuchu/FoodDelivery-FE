import slugify from "slugify";

export default function Slug(data: string): string {
  try {
    return slugify(data, {
      replacement: "-",
      lower: true,
      locale: "vi",
    });
  } catch (error) {
    throw new Error(String(error));
  }
}
