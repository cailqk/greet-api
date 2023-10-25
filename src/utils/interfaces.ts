interface Prices {
  price: string;
  regular_price: string;
  sale_price: string;
  price_range: string | null;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}

interface Images {
  id: number;
  src: string;
  thumbnail: string;
  srcset: string;
  sizes: string;
  name: string;
  alt: string;
}

interface Category {
  id: number;
  name: string;
  slug?: string;
  link?: string;
}

interface AddToCart {
  text: string;
  description: string;
  url: string;
  minimum: number;
  maximum: number;
  multiple_of: number;
}

interface Person {
  id: number;
  name: string;
  slug: string;
  parent: number;
  type: string;
  variation: string;
  permalink: string;
  sku: string;
  short_description: string;
  description: string;
  on_sale: boolean;
  prices: Prices;
  price_html: string;
  average_rating: string;
  review_count: number;
  images: Images[];
  categories: Category[];
  tags: [];
  attributes: [];
  variations: [];
  has_options: boolean;
  is_purchasable: boolean;
  is_in_stock: boolean;
  is_on_backorder: boolean;
  low_stock_remaining: null;
  sold_individually: boolean;
  add_to_cart: AddToCart;
  extensions: object;
}

interface FilterCriteria {
  page?: number;
  category?: number;
  order?: string;
  orderby?: string;
  append?: boolean;
}

export type { FilterCriteria, Person, AddToCart, Images, Prices, Category };
