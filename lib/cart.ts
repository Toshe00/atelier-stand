import type { Product } from "./products";
import type { CustomStandConfig } from "./pricing";

export type CartLine =
  | {
      type: "standard";
      quantity: number;
      product: Product;
    }
  | {
      type: "custom";
      quantity: number;
      config: CustomStandConfig;
      price: number;
    };
