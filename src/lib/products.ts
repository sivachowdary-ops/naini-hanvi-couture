import { supabase, isSupabaseConfigured } from "./supabase";

export type MediaItem = {
  type: "image" | "video";
  src: string;
  thumbnail: string;
  alt?: string;
};

export type ProductVariant = {
  id: string;
  colorName: string;
  swatchImage: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: "Naini Hanvi Couture";
  category: string;
  price: number;
  mrp?: number;
  inStock: boolean;
  isBestSeller: boolean;
  badge?: "new" | "bestseller" | null;
  fabric?: string;
  lengthWidth?: string;
  blouseDetail?: string;
  description: string;
  gallery: MediaItem[];
  variants?: ProductVariant[];
  tags?: string[];
  sourceFiles?: string[];
  selectionReason?: string[];
  matchedVideo?: string | null;
};

export type CartLineItem = {
  productId: string;
  variantId?: string;
  quantity: number;
};

export type CheckoutFormData = {
  fullName: string;
  mobile: string;
  addressLine: string;
  state: string;
  city: string;
  pinCode: string;
  email?: string;
  orderNotes?: string;
};

export const MOCK_PRODUCTS: Product[] = [
  {
    "id": "prod-1",
    "slug": "malai-cottons-saree-01",
    "name": "Malai Cottons Saree 01",
    "brand": "Naini Hanvi Couture",
    "category": "Malai Cottons",
    "price": 3185,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Malai Cottons",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Malai Cottons saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/malai-cottons/malai-cottons-saree-01-img1.webp",
        "thumbnail": "/catalog/malai-cottons/malai-cottons-saree-01-img1.webp",
        "alt": "Malai Cottons Saree 01 - View 1"
      },
      {
        "type": "image",
        "src": "/catalog/malai-cottons/malai-cottons-saree-01-img2.webp",
        "thumbnail": "/catalog/malai-cottons/malai-cottons-saree-01-img2.webp",
        "alt": "Malai Cottons Saree 01 - View 2"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5807.HEIC",
      "IMG_5808.HEIC"
    ],
    "selectionReason": [
      "IMG_5807.HEIC: score 0.786 (res: 3212x5712)",
      "IMG_5808.HEIC: score 0.783 (res: 3212x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-2",
    "slug": "malai-cottons-saree-02",
    "name": "Malai Cottons Saree 02",
    "brand": "Naini Hanvi Couture",
    "category": "Malai Cottons",
    "price": 2043,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Malai Cottons",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Malai Cottons saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/malai-cottons/malai-cottons-saree-02-img1.webp",
        "thumbnail": "/catalog/malai-cottons/malai-cottons-saree-02-img1.webp",
        "alt": "Malai Cottons Saree 02 - View 1"
      },
      {
        "type": "video",
        "src": "/catalog/malai-cottons/malai-cottons-saree-02-video.mp4",
        "thumbnail": "/catalog/malai-cottons/malai-cottons-saree-02-poster.webp",
        "alt": "Malai Cottons Saree 02 - Video"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5809.HEIC"
    ],
    "selectionReason": [
      "IMG_5809.HEIC: score 0.788 (res: 3212x5712)"
    ],
    "matchedVideo": "IMG_5828.MOV (4.9s)"
  },
  {
    "id": "prod-3",
    "slug": "malai-cottons-saree-03",
    "name": "Malai Cottons Saree 03",
    "brand": "Naini Hanvi Couture",
    "category": "Malai Cottons",
    "price": 3781,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Malai Cottons",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Malai Cottons saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/malai-cottons/malai-cottons-saree-03-img1.webp",
        "thumbnail": "/catalog/malai-cottons/malai-cottons-saree-03-img1.webp",
        "alt": "Malai Cottons Saree 03 - View 1"
      },
      {
        "type": "video",
        "src": "/catalog/malai-cottons/malai-cottons-saree-03-video.mp4",
        "thumbnail": "/catalog/malai-cottons/malai-cottons-saree-03-poster.webp",
        "alt": "Malai Cottons Saree 03 - Video"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5811.HEIC"
    ],
    "selectionReason": [
      "IMG_5811.HEIC: score 0.782 (res: 3212x5712)"
    ],
    "matchedVideo": "IMG_5833.MOV (4.8s)"
  },
  {
    "id": "prod-4",
    "slug": "malai-cottons-saree-04",
    "name": "Malai Cottons Saree 04",
    "brand": "Naini Hanvi Couture",
    "category": "Malai Cottons",
    "price": 2074,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Malai Cottons",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Malai Cottons saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/malai-cottons/malai-cottons-saree-04-img1.webp",
        "thumbnail": "/catalog/malai-cottons/malai-cottons-saree-04-img1.webp",
        "alt": "Malai Cottons Saree 04 - View 1"
      },
      {
        "type": "video",
        "src": "/catalog/malai-cottons/malai-cottons-saree-04-video.mp4",
        "thumbnail": "/catalog/malai-cottons/malai-cottons-saree-04-poster.webp",
        "alt": "Malai Cottons Saree 04 - Video"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5817.HEIC"
    ],
    "selectionReason": [
      "IMG_5817.HEIC: score 0.778 (res: 3212x5712)"
    ],
    "matchedVideo": "IMG_5835.MOV (4.6s)"
  },
  {
    "id": "prod-5",
    "slug": "malai-cottons-saree-05",
    "name": "Malai Cottons Saree 05",
    "brand": "Naini Hanvi Couture",
    "category": "Malai Cottons",
    "price": 4526,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Malai Cottons",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Malai Cottons saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/malai-cottons/malai-cottons-saree-05-img1.webp",
        "thumbnail": "/catalog/malai-cottons/malai-cottons-saree-05-img1.webp",
        "alt": "Malai Cottons Saree 05 - View 1"
      },
      {
        "type": "video",
        "src": "/catalog/malai-cottons/malai-cottons-saree-05-video.mp4",
        "thumbnail": "/catalog/malai-cottons/malai-cottons-saree-05-poster.webp",
        "alt": "Malai Cottons Saree 05 - Video"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5818.HEIC"
    ],
    "selectionReason": [
      "IMG_5818.HEIC: score 0.778 (res: 3212x5712)"
    ],
    "matchedVideo": "IMG_5836.MOV (4.2s)"
  },
  {
    "id": "prod-6",
    "slug": "malai-cottons-saree-06",
    "name": "Malai Cottons Saree 06",
    "brand": "Naini Hanvi Couture",
    "category": "Malai Cottons",
    "price": 2416,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Malai Cottons",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Malai Cottons saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/malai-cottons/malai-cottons-saree-06-img1.webp",
        "thumbnail": "/catalog/malai-cottons/malai-cottons-saree-06-img1.webp",
        "alt": "Malai Cottons Saree 06 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5819.HEIC"
    ],
    "selectionReason": [
      "IMG_5819.HEIC: score 0.774 (res: 3212x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-7",
    "slug": "malai-cottons-saree-07",
    "name": "Malai Cottons Saree 07",
    "brand": "Naini Hanvi Couture",
    "category": "Malai Cottons",
    "price": 2122,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Malai Cottons",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Malai Cottons saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/malai-cottons/malai-cottons-saree-07-img1.webp",
        "thumbnail": "/catalog/malai-cottons/malai-cottons-saree-07-img1.webp",
        "alt": "Malai Cottons Saree 07 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5820.HEIC"
    ],
    "selectionReason": [
      "IMG_5820.HEIC: score 0.536 (res: 2268x4032)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-8",
    "slug": "malai-cottons-saree-08",
    "name": "Malai Cottons Saree 08",
    "brand": "Naini Hanvi Couture",
    "category": "Malai Cottons",
    "price": 4653,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Malai Cottons",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Malai Cottons saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/malai-cottons/malai-cottons-saree-08-img1.webp",
        "thumbnail": "/catalog/malai-cottons/malai-cottons-saree-08-img1.webp",
        "alt": "Malai Cottons Saree 08 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5821.HEIC"
    ],
    "selectionReason": [
      "IMG_5821.HEIC: score 0.783 (res: 3212x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-9",
    "slug": "malai-cottons-saree-09",
    "name": "Malai Cottons Saree 09",
    "brand": "Naini Hanvi Couture",
    "category": "Malai Cottons",
    "price": 3974,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Malai Cottons",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Malai Cottons saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/malai-cottons/malai-cottons-saree-09-img1.webp",
        "thumbnail": "/catalog/malai-cottons/malai-cottons-saree-09-img1.webp",
        "alt": "Malai Cottons Saree 09 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5822.HEIC"
    ],
    "selectionReason": [
      "IMG_5822.HEIC: score 0.782 (res: 3212x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-10",
    "slug": "malai-cottons-saree-10",
    "name": "Malai Cottons Saree 10",
    "brand": "Naini Hanvi Couture",
    "category": "Malai Cottons",
    "price": 2776,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Malai Cottons",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Malai Cottons saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/malai-cottons/malai-cottons-saree-10-img1.webp",
        "thumbnail": "/catalog/malai-cottons/malai-cottons-saree-10-img1.webp",
        "alt": "Malai Cottons Saree 10 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5823.HEIC"
    ],
    "selectionReason": [
      "IMG_5823.HEIC: score 0.783 (res: 3212x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-11",
    "slug": "malai-cottons-saree-11",
    "name": "Malai Cottons Saree 11",
    "brand": "Naini Hanvi Couture",
    "category": "Malai Cottons",
    "price": 4115,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Malai Cottons",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Malai Cottons saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/malai-cottons/malai-cottons-saree-11-img1.webp",
        "thumbnail": "/catalog/malai-cottons/malai-cottons-saree-11-img1.webp",
        "alt": "Malai Cottons Saree 11 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5824.HEIC"
    ],
    "selectionReason": [
      "IMG_5824.HEIC: score 0.540 (res: 2268x4032)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-12",
    "slug": "malai-cottons-saree-12",
    "name": "Malai Cottons Saree 12",
    "brand": "Naini Hanvi Couture",
    "category": "Malai Cottons",
    "price": 3204,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Malai Cottons",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Malai Cottons saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/malai-cottons/malai-cottons-saree-12-img1.webp",
        "thumbnail": "/catalog/malai-cottons/malai-cottons-saree-12-img1.webp",
        "alt": "Malai Cottons Saree 12 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5825.HEIC"
    ],
    "selectionReason": [
      "IMG_5825.HEIC: score 0.541 (res: 2268x4032)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-13",
    "slug": "malai-cottons-saree-13",
    "name": "Malai Cottons Saree 13",
    "brand": "Naini Hanvi Couture",
    "category": "Malai Cottons",
    "price": 3640,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Malai Cottons",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Malai Cottons saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/malai-cottons/malai-cottons-saree-13-img1.webp",
        "thumbnail": "/catalog/malai-cottons/malai-cottons-saree-13-img1.webp",
        "alt": "Malai Cottons Saree 13 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5826.HEIC"
    ],
    "selectionReason": [
      "IMG_5826.HEIC: score 0.541 (res: 2268x4032)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-14",
    "slug": "malai-cottons-saree-14",
    "name": "Malai Cottons Saree 14",
    "brand": "Naini Hanvi Couture",
    "category": "Malai Cottons",
    "price": 2488,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Malai Cottons",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Malai Cottons saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/malai-cottons/malai-cottons-saree-14-img1.webp",
        "thumbnail": "/catalog/malai-cottons/malai-cottons-saree-14-img1.webp",
        "alt": "Malai Cottons Saree 14 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5829.HEIC"
    ],
    "selectionReason": [
      "IMG_5829.HEIC: score 0.780 (res: 3212x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-15",
    "slug": "malai-cottons-saree-15",
    "name": "Malai Cottons Saree 15",
    "brand": "Naini Hanvi Couture",
    "category": "Malai Cottons",
    "price": 2626,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Malai Cottons",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Malai Cottons saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/malai-cottons/malai-cottons-saree-15-img1.webp",
        "thumbnail": "/catalog/malai-cottons/malai-cottons-saree-15-img1.webp",
        "alt": "Malai Cottons Saree 15 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5830.HEIC"
    ],
    "selectionReason": [
      "IMG_5830.HEIC: score 0.773 (res: 3212x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-16",
    "slug": "malai-cottons-saree-16",
    "name": "Malai Cottons Saree 16",
    "brand": "Naini Hanvi Couture",
    "category": "Malai Cottons",
    "price": 2027,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Malai Cottons",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Malai Cottons saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/malai-cottons/malai-cottons-saree-16-img1.webp",
        "thumbnail": "/catalog/malai-cottons/malai-cottons-saree-16-img1.webp",
        "alt": "Malai Cottons Saree 16 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5831.HEIC"
    ],
    "selectionReason": [
      "IMG_5831.HEIC: score 0.782 (res: 3212x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-17",
    "slug": "malai-cottons-saree-17",
    "name": "Malai Cottons Saree 17",
    "brand": "Naini Hanvi Couture",
    "category": "Malai Cottons",
    "price": 4256,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Malai Cottons",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Malai Cottons saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/malai-cottons/malai-cottons-saree-17-img1.webp",
        "thumbnail": "/catalog/malai-cottons/malai-cottons-saree-17-img1.webp",
        "alt": "Malai Cottons Saree 17 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5832.HEIC"
    ],
    "selectionReason": [
      "IMG_5832.HEIC: score 0.544 (res: 2268x4032)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-18",
    "slug": "malai-cottons-saree-18",
    "name": "Malai Cottons Saree 18",
    "brand": "Naini Hanvi Couture",
    "category": "Malai Cottons",
    "price": 3659,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Malai Cottons",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Malai Cottons saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/malai-cottons/malai-cottons-saree-18-img1.webp",
        "thumbnail": "/catalog/malai-cottons/malai-cottons-saree-18-img1.webp",
        "alt": "Malai Cottons Saree 18 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5834.HEIC"
    ],
    "selectionReason": [
      "IMG_5834.HEIC: score 0.782 (res: 3212x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-19",
    "slug": "malai-cottons-saree-19",
    "name": "Malai Cottons Saree 19",
    "brand": "Naini Hanvi Couture",
    "category": "Malai Cottons",
    "price": 4531,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Malai Cottons",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Malai Cottons saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/malai-cottons/malai-cottons-saree-19-img1.webp",
        "thumbnail": "/catalog/malai-cottons/malai-cottons-saree-19-img1.webp",
        "alt": "Malai Cottons Saree 19 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5977.HEIC"
    ],
    "selectionReason": [
      "IMG_5977.HEIC: score 1.000 (res: 4284x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-20",
    "slug": "muslin-sequence-saree-20",
    "name": "Muslin Sequence Saree 20",
    "brand": "Naini Hanvi Couture",
    "category": "Muslin Sequence",
    "price": 2283,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Muslin Sequence",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Muslin Sequence saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/muslin-sequence/muslin-sequence-saree-20-img1.webp",
        "thumbnail": "/catalog/muslin-sequence/muslin-sequence-saree-20-img1.webp",
        "alt": "Muslin Sequence Saree 20 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5850.HEIC"
    ],
    "selectionReason": [
      "IMG_5850.HEIC: score 0.940 (res: 4284x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-21",
    "slug": "muslin-sequence-saree-21",
    "name": "Muslin Sequence Saree 21",
    "brand": "Naini Hanvi Couture",
    "category": "Muslin Sequence",
    "price": 3572,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Muslin Sequence",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Muslin Sequence saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/muslin-sequence/muslin-sequence-saree-21-img1.webp",
        "thumbnail": "/catalog/muslin-sequence/muslin-sequence-saree-21-img1.webp",
        "alt": "Muslin Sequence Saree 21 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5851.HEIC"
    ],
    "selectionReason": [
      "IMG_5851.HEIC: score 0.992 (res: 4284x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-22",
    "slug": "muslin-sequence-saree-22",
    "name": "Muslin Sequence Saree 22",
    "brand": "Naini Hanvi Couture",
    "category": "Muslin Sequence",
    "price": 4710,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Muslin Sequence",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Muslin Sequence saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/muslin-sequence/muslin-sequence-saree-22-img1.webp",
        "thumbnail": "/catalog/muslin-sequence/muslin-sequence-saree-22-img1.webp",
        "alt": "Muslin Sequence Saree 22 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5853.HEIC"
    ],
    "selectionReason": [
      "IMG_5853.HEIC: score 0.984 (res: 4284x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-23",
    "slug": "muslin-sequence-saree-23",
    "name": "Muslin Sequence Saree 23",
    "brand": "Naini Hanvi Couture",
    "category": "Muslin Sequence",
    "price": 3814,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Muslin Sequence",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Muslin Sequence saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/muslin-sequence/muslin-sequence-saree-23-img1.webp",
        "thumbnail": "/catalog/muslin-sequence/muslin-sequence-saree-23-img1.webp",
        "alt": "Muslin Sequence Saree 23 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5854.HEIC"
    ],
    "selectionReason": [
      "IMG_5854.HEIC: score 1.000 (res: 4284x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-24",
    "slug": "muslin-sequence-saree-24",
    "name": "Muslin Sequence Saree 24",
    "brand": "Naini Hanvi Couture",
    "category": "Muslin Sequence",
    "price": 4813,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Muslin Sequence",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Muslin Sequence saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/muslin-sequence/muslin-sequence-saree-24-img1.webp",
        "thumbnail": "/catalog/muslin-sequence/muslin-sequence-saree-24-img1.webp",
        "alt": "Muslin Sequence Saree 24 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5855.HEIC"
    ],
    "selectionReason": [
      "IMG_5855.HEIC: score 1.000 (res: 4284x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-25",
    "slug": "muslin-sequence-saree-25",
    "name": "Muslin Sequence Saree 25",
    "brand": "Naini Hanvi Couture",
    "category": "Muslin Sequence",
    "price": 4514,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Muslin Sequence",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Muslin Sequence saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/muslin-sequence/muslin-sequence-saree-25-img1.webp",
        "thumbnail": "/catalog/muslin-sequence/muslin-sequence-saree-25-img1.webp",
        "alt": "Muslin Sequence Saree 25 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5856.HEIC"
    ],
    "selectionReason": [
      "IMG_5856.HEIC: score 1.000 (res: 4284x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-26",
    "slug": "muslin-sequence-saree-26",
    "name": "Muslin Sequence Saree 26",
    "brand": "Naini Hanvi Couture",
    "category": "Muslin Sequence",
    "price": 2140,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Muslin Sequence",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Muslin Sequence saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/muslin-sequence/muslin-sequence-saree-26-img1.webp",
        "thumbnail": "/catalog/muslin-sequence/muslin-sequence-saree-26-img1.webp",
        "alt": "Muslin Sequence Saree 26 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5857.HEIC"
    ],
    "selectionReason": [
      "IMG_5857.HEIC: score 0.960 (res: 4284x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-27",
    "slug": "muslin-sequence-saree-27",
    "name": "Muslin Sequence Saree 27",
    "brand": "Naini Hanvi Couture",
    "category": "Muslin Sequence",
    "price": 2344,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Muslin Sequence",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Muslin Sequence saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/muslin-sequence/muslin-sequence-saree-27-img1.webp",
        "thumbnail": "/catalog/muslin-sequence/muslin-sequence-saree-27-img1.webp",
        "alt": "Muslin Sequence Saree 27 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5858.HEIC"
    ],
    "selectionReason": [
      "IMG_5858.HEIC: score 0.982 (res: 4284x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-28",
    "slug": "muslin-sequence-saree-28",
    "name": "Muslin Sequence Saree 28",
    "brand": "Naini Hanvi Couture",
    "category": "Muslin Sequence",
    "price": 4159,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Muslin Sequence",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Muslin Sequence saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/muslin-sequence/muslin-sequence-saree-28-img1.webp",
        "thumbnail": "/catalog/muslin-sequence/muslin-sequence-saree-28-img1.webp",
        "alt": "Muslin Sequence Saree 28 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5859.HEIC"
    ],
    "selectionReason": [
      "IMG_5859.HEIC: score 0.949 (res: 4284x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-29",
    "slug": "silk-kota-saree-29",
    "name": "Silk Kota Saree 29",
    "brand": "Naini Hanvi Couture",
    "category": "Silk Kota",
    "price": 4412,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Silk Kota",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Silk Kota saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/silk-kota/silk-kota-saree-29-img1.webp",
        "thumbnail": "/catalog/silk-kota/silk-kota-saree-29-img1.webp",
        "alt": "Silk Kota Saree 29 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5976.HEIC"
    ],
    "selectionReason": [
      "IMG_5976.HEIC: score 1.000 (res: 4284x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-30",
    "slug": "silk-kota-saree-30",
    "name": "Silk Kota Saree 30",
    "brand": "Naini Hanvi Couture",
    "category": "Silk Kota",
    "price": 4106,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Silk Kota",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Silk Kota saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/silk-kota/silk-kota-saree-30-img1.webp",
        "thumbnail": "/catalog/silk-kota/silk-kota-saree-30-img1.webp",
        "alt": "Silk Kota Saree 30 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5977.HEIC"
    ],
    "selectionReason": [
      "IMG_5977.HEIC: score 1.000 (res: 4284x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-31",
    "slug": "silk-kota-saree-31",
    "name": "Silk Kota Saree 31",
    "brand": "Naini Hanvi Couture",
    "category": "Silk Kota",
    "price": 4833,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Silk Kota",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Silk Kota saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/silk-kota/silk-kota-saree-31-img1.webp",
        "thumbnail": "/catalog/silk-kota/silk-kota-saree-31-img1.webp",
        "alt": "Silk Kota Saree 31 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5980.HEIC"
    ],
    "selectionReason": [
      "IMG_5980.HEIC: score 1.000 (res: 4284x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-32",
    "slug": "silk-kota-saree-32",
    "name": "Silk Kota Saree 32",
    "brand": "Naini Hanvi Couture",
    "category": "Silk Kota",
    "price": 4481,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Silk Kota",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Silk Kota saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/silk-kota/silk-kota-saree-32-img1.webp",
        "thumbnail": "/catalog/silk-kota/silk-kota-saree-32-img1.webp",
        "alt": "Silk Kota Saree 32 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5981.HEIC"
    ],
    "selectionReason": [
      "IMG_5981.HEIC: score 0.972 (res: 4284x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-33",
    "slug": "silk-kota-saree-33",
    "name": "Silk Kota Saree 33",
    "brand": "Naini Hanvi Couture",
    "category": "Silk Kota",
    "price": 3293,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Silk Kota",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Silk Kota saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/silk-kota/silk-kota-saree-33-img1.webp",
        "thumbnail": "/catalog/silk-kota/silk-kota-saree-33-img1.webp",
        "alt": "Silk Kota Saree 33 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5982.HEIC"
    ],
    "selectionReason": [
      "IMG_5982.HEIC: score 0.977 (res: 4284x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-34",
    "slug": "silk-kota-saree-34",
    "name": "Silk Kota Saree 34",
    "brand": "Naini Hanvi Couture",
    "category": "Silk Kota",
    "price": 4995,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Silk Kota",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Silk Kota saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/silk-kota/silk-kota-saree-34-img1.webp",
        "thumbnail": "/catalog/silk-kota/silk-kota-saree-34-img1.webp",
        "alt": "Silk Kota Saree 34 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5983.HEIC"
    ],
    "selectionReason": [
      "IMG_5983.HEIC: score 1.000 (res: 4284x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-35",
    "slug": "silk-kota-saree-35",
    "name": "Silk Kota Saree 35",
    "brand": "Naini Hanvi Couture",
    "category": "Silk Kota",
    "price": 2007,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Silk Kota",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Silk Kota saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/silk-kota/silk-kota-saree-35-img1.webp",
        "thumbnail": "/catalog/silk-kota/silk-kota-saree-35-img1.webp",
        "alt": "Silk Kota Saree 35 - View 1"
      },
      {
        "type": "image",
        "src": "/catalog/silk-kota/silk-kota-saree-35-img2.webp",
        "thumbnail": "/catalog/silk-kota/silk-kota-saree-35-img2.webp",
        "alt": "Silk Kota Saree 35 - View 2"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5985.HEIC",
      "IMG_5984.HEIC"
    ],
    "selectionReason": [
      "IMG_5985.HEIC: score 1.000 (res: 4284x5712)",
      "IMG_5984.HEIC: score 0.985 (res: 4284x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-36",
    "slug": "silk-kota-saree-36",
    "name": "Silk Kota Saree 36",
    "brand": "Naini Hanvi Couture",
    "category": "Silk Kota",
    "price": 2802,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Silk Kota",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Silk Kota saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/silk-kota/silk-kota-saree-36-img1.webp",
        "thumbnail": "/catalog/silk-kota/silk-kota-saree-36-img1.webp",
        "alt": "Silk Kota Saree 36 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5986.HEIC"
    ],
    "selectionReason": [
      "IMG_5986.HEIC: score 0.984 (res: 4284x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-37",
    "slug": "silk-kota-saree-37",
    "name": "Silk Kota Saree 37",
    "brand": "Naini Hanvi Couture",
    "category": "Silk Kota",
    "price": 2173,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Silk Kota",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Silk Kota saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/silk-kota/silk-kota-saree-37-img1.webp",
        "thumbnail": "/catalog/silk-kota/silk-kota-saree-37-img1.webp",
        "alt": "Silk Kota Saree 37 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5989.HEIC"
    ],
    "selectionReason": [
      "IMG_5989.HEIC: score 1.000 (res: 4284x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-38",
    "slug": "silk-kota-saree-38",
    "name": "Silk Kota Saree 38",
    "brand": "Naini Hanvi Couture",
    "category": "Silk Kota",
    "price": 2539,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Silk Kota",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Silk Kota saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/silk-kota/silk-kota-saree-38-img1.webp",
        "thumbnail": "/catalog/silk-kota/silk-kota-saree-38-img1.webp",
        "alt": "Silk Kota Saree 38 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5994.HEIC"
    ],
    "selectionReason": [
      "IMG_5994.HEIC: score 0.963 (res: 4284x5712)"
    ],
    "matchedVideo": null
  },
  {
    "id": "prod-39",
    "slug": "silk-kota-saree-39",
    "name": "Silk Kota Saree 39",
    "brand": "Naini Hanvi Couture",
    "category": "Silk Kota",
    "price": 3074,
    "inStock": true,
    "isBestSeller": false,
    "badge": null,
    "fabric": "Silk Kota",
    "lengthWidth": "5.5 meters, 1.1 meters width",
    "blouseDetail": "Unstitched blouse piece included (0.8m)",
    "description": "A beautiful Silk Kota saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.",
    "gallery": [
      {
        "type": "image",
        "src": "/catalog/silk-kota/silk-kota-saree-39-img1.webp",
        "thumbnail": "/catalog/silk-kota/silk-kota-saree-39-img1.webp",
        "alt": "Silk Kota Saree 39 - View 1"
      }
    ],
    "variants": [],
    "tags": [],
    "sourceFiles": [
      "IMG_5995.HEIC"
    ],
    "selectionReason": [
      "IMG_5995.HEIC: score 1.000 (res: 4284x5712)"
    ],
    "matchedVideo": null
  }
];

// Helper to map DB columns to TS types
export function mapDbProductToProduct(dbProduct: any): Product {
  return {
    id: dbProduct.id,
    slug: dbProduct.slug,
    name: dbProduct.name,
    brand: dbProduct.brand as "Naini Hanvi Couture",
    category: dbProduct.category,
    price: Number(dbProduct.price),
    mrp: dbProduct.mrp ? Number(dbProduct.mrp) : undefined,
    inStock: dbProduct.in_stock,
    isBestSeller: dbProduct.is_bestseller || false,
    badge: dbProduct.badge || null,
    fabric: dbProduct.fabric || "",
    lengthWidth: dbProduct.length_width || "",
    blouseDetail: dbProduct.blouse_detail || "",
    description: dbProduct.description,
    gallery: Array.isArray(dbProduct.gallery) ? dbProduct.gallery : [],
    variants: Array.isArray(dbProduct.variants) ? dbProduct.variants : [],
    tags: Array.isArray(dbProduct.tags) ? dbProduct.tags : [],
  };
}

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured) {
    console.log("Supabase not configured, using local mock products.");
    return MOCK_PRODUCTS;
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) return MOCK_PRODUCTS;
    
    return data.map(mapDbProductToProduct);
  } catch (err) {
    console.error("Error fetching products from Supabase, falling back to mock:", err);
    return MOCK_PRODUCTS;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (!isSupabaseConfigured) {
    return MOCK_PRODUCTS.find((p) => p.slug === slug);
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw error;
    if (!data) return MOCK_PRODUCTS.find((p) => p.slug === slug);

    return mapDbProductToProduct(data);
  } catch (err) {
    console.error(`Error fetching product by slug ${slug} from Supabase, falling back to mock:`, err);
    return MOCK_PRODUCTS.find((p) => p.slug === slug);
  }
}
