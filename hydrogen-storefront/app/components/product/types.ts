import type {CurrencyCode} from '@shopify/hydrogen/storefront-api-types';

export interface MoneyAmount {
  amount: string;
  currencyCode: CurrencyCode;
}

export interface ImageNode {
  url: string;
  altText?: string | null;
  width?: number;
  height?: number;
}

export interface VariantNode {
  id: string;
  title: string;
  availableForSale: boolean;
  price: MoneyAmount;
  selectedOptions: {name: string; value: string}[];
}

export interface ProductOption {
  name: string;
  optionValues: {name: string}[];
}

export interface StoryProduct {
  id: string;
  title: string;
  handle: string;
  description?: string | null;
  productType?: string | null;
  priceRange: {minVariantPrice: MoneyAmount};
  compareAtPriceRange?: {minVariantPrice: MoneyAmount} | null;
  images: {nodes: ImageNode[]};
  variants: {nodes: VariantNode[]};
  options?: ProductOption[];
  availableForSale: boolean;
}

export function findVariant(variants: VariantNode[], selected: Record<string, string>) {
  return (
    variants.find((v) => v.selectedOptions.every((o) => selected[o.name] === o.value)) ||
    variants[0]
  );
}
