export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: Rating;
}

// export enum Category {
//   Electronics = 'electronics',
//   Jewelery = 'jewelery',
//   MenSClothing = "men's clothing",
//   WomenSClothing = "women's clothing",
// }

export interface Rating {
  rate: number;
  count: number;
}
