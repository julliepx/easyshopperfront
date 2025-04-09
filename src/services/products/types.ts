export enum Category {
  SMARTPHONES = "SMARTPHONES",
  HARDWARE = "HARDWARE",
  TV = "TV",
  GAMES = "GAMES",
  CAMERAS = "CAMERAS",
  COMPUTERS = "COMPUTERS",
  DESK = "DESK",
  PERIPHERALS = "PERIPHERALS",
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: Category;
  stock: number;
}
