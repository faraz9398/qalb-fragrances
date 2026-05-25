import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Paradise Intense",
    slug: "paradise-intense",
    description:
      "An intense, captivating fragrance that transports you to a realm of pure bliss. With rich, warm notes that linger throughout the day, Paradise Intense is your signature scent for unforgettable moments.",
    price: 1200,
    salePrice: 800,
    images: [
      "https://qalbfragrances.com/cdn/shop/files/ChatGPTImageMay20_2026_07_39_46PM.png?v=1779286212&width=3840",
    ],
    category: "Signature",
    inStock: true,
    featured: true,
    volume: "50ml",
  },
  {
    id: "2",
    name: "THE QALB COMBO 1",
    slug: "the-qalb-combo-1",
    description:
      "A curated selection of our finest fragrances in one luxurious combo. Experience the essence of Qalb with this exclusive set, perfect for those who appreciate variety and sophistication.",
    price: 2999,
    salePrice: 2100,
    images: [
      "https://qalbfragrances.com/cdn/shop/files/ChatGPTImageMay21_2026_05_10_32PM.png?v=1779368177&width=3840",
    ],
    category: "Combo",
    inStock: true,
    featured: true,
    volume: "Set of 3",
  },
  {
    id: "3",
    name: "THE QALB COMBO 2",
    slug: "the-qalb-combo-2",
    description:
      "Discover a new dimension of fragrance with Combo 2. A harmonious blend of scents designed to complement your unique personality and elevate your everyday presence.",
    price: 2999,
    salePrice: 2100,
    images: [
      "https://qalbfragrances.com/cdn/shop/files/ChatGPTImageMay21_2026_05_10_22PM.png?v=1779369425&width=3840",
    ],
    category: "Combo",
    inStock: true,
    featured: true,
    volume: "Set of 3",
  },
  {
    id: "4",
    name: "THE QALB COMBO 3",
    slug: "the-qalb-combo-3",
    description:
      "The ultimate fragrance collection for the discerning connoisseur. Combo 3 brings together our most beloved scents in a beautifully packaged set that makes every day extraordinary.",
    price: 2999,
    salePrice: 2100,
    images: [
      "https://qalbfragrances.com/cdn/shop/files/ChatGPTImageMay21_2026_05_10_36PM.png?v=1779370097&width=3840",
    ],
    category: "Combo",
    inStock: true,
    featured: true,
    volume: "Set of 3",
  },
];

export const categories = ["All", "Signature", "Combo"];
