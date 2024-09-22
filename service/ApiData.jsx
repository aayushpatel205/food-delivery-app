import client from "../restaurant-app/sanityClient";
export const restaurantDataFunc = async () => {
  const data = await client.fetch(`*[_type == "featured" && name in ["Chinese Food", "Fried Chicken"]] {
  name,
  description,
  restaurants[]->{
    "type": type->name,
    name,
    reviews,
    lat,
    lng,
    rating,
    type,
    address,
    "image": image.asset->url,
    dishes[]->{
      name,
      description,
      price,
      image
    }
  }
}
`);
  return data;
};

export const categoryDataFunc = async () => {
  const data = await client.fetch(`*[_type == "category"]{
  ...
}`);
  return data;
};
