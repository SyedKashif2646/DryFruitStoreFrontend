export interface Product {
  id: number; // Make id required, not optional
  name: string;
  description: string;
  price: number;
  quantity: number;
  imagePath: string;
}
