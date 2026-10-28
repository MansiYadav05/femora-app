import { CATEGORIES, Category } from "../utils/constants";
import {
  Article,
  KitBundle,
  MOCK_ARTICLES,
  MOCK_KITS,
  MOCK_PRODUCTS,
  Product,
} from "../data/mockData";
import { api, ApiResponse, simulateDelay, USE_MOCK } from "./api";

export interface ProductFilterParams {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "featured" | "price-asc" | "price-desc" | "rating" | "bestseller";
  organicOnly?: boolean;
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

// In-memory products store for runtime mock edits (e.g. from admin panel)
let localProducts = [...MOCK_PRODUCTS];

export const productService = {
  async getProducts(params: ProductFilterParams = {}): Promise<ApiResponse<PaginatedResult<Product>>> {
    if (USE_MOCK) {
      await simulateDelay(300);
      let list = localProducts.filter((p) => p.active !== false);

      // Search query
      if (params.q && params.q.trim()) {
        const query = params.q.toLowerCase().trim();
        list = list.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            (p.ingredients && p.ingredients.toLowerCase().includes(query))
        );
      }

      // Category filter
      if (params.category && params.category !== "all") {
        list = list.filter(
          (p) =>
            p.categorySlug === params.category ||
            p.category.toLowerCase() === params.category?.toLowerCase()
        );
      }

      // Organic only filter
      if (params.organicOnly) {
        list = list.filter((p) => p.isOrganic);
      }

      // Price range
      if (params.minPrice !== undefined) {
        list = list.filter((p) => p.price >= (params.minPrice ?? 0));
      }
      if (params.maxPrice !== undefined) {
        list = list.filter((p) => p.price <= (params.maxPrice ?? 99999));
      }

      // Sorting
      if (params.sort) {
        switch (params.sort) {
          case "price-asc":
            list.sort((a, b) => a.price - b.price);
            break;
          case "price-desc":
            list.sort((a, b) => b.price - a.price);
            break;
          case "rating":
            list.sort((a, b) => b.rating - a.rating);
            break;
          case "bestseller":
            list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
            break;
          case "featured":
          default:
            list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
            break;
        }
      }

      const total = list.length;
      const limit = params.limit || 12;
      const page = Math.max(1, params.page || 1);
      const totalPages = Math.ceil(total / limit) || 1;
      const startIndex = (page - 1) * limit;
      const paginatedItems = list.slice(startIndex, startIndex + limit);

      return {
        success: true,
        data: {
          items: paginatedItems,
          total,
          page,
          totalPages,
          limit,
        },
        message: "Products fetched",
      };
    }

    const res = await api.get<ApiResponse<PaginatedResult<Product>>>("/products", { params });
    return res.data;
  },

  async getProduct(slug: string): Promise<ApiResponse<Product | null>> {
    if (USE_MOCK) {
      await simulateDelay(250);
      const product = localProducts.find((p) => p.slug === slug || p.id === slug) || null;
      return {
        success: !!product,
        data: product,
        message: product ? "Product found" : "Product not found",
      };
    }

    const res = await api.get<ApiResponse<Product>>(`/products/${slug}`);
    return res.data;
  },

  async getCategories(): Promise<ApiResponse<Category[]>> {
    if (USE_MOCK) {
      await simulateDelay(150);
      return {
        success: true,
        data: CATEGORIES,
        message: "Categories fetched",
      };
    }

    const res = await api.get<ApiResponse<Category[]>>("/categories");
    return res.data;
  },

  async getKits(): Promise<ApiResponse<KitBundle[]>> {
    if (USE_MOCK) {
      await simulateDelay(250);
      return {
        success: true,
        data: MOCK_KITS,
        message: "Relief kits fetched",
      };
    }

    const res = await api.get<ApiResponse<KitBundle[]>>("/kits");
    return res.data;
  },

  async getRelatedProducts(currentSlug: string, categorySlug: string): Promise<ApiResponse<Product[]>> {
    if (USE_MOCK) {
      await simulateDelay(200);
      const related = localProducts
        .filter((p) => p.categorySlug === categorySlug && p.slug !== currentSlug)
        .slice(0, 4);
      return {
        success: true,
        data: related,
        message: "Related products fetched",
      };
    }

    const res = await api.get<ApiResponse<Product[]>>(`/products/${currentSlug}/related`);
    return res.data;
  },

  async getArticles(): Promise<ApiResponse<Article[]>> {
    if (USE_MOCK) {
      await simulateDelay(200);
      return {
        success: true,
        data: MOCK_ARTICLES,
        message: "Articles fetched",
      };
    }

    const res = await api.get<ApiResponse<Article[]>>("/articles");
    return res.data;
  },

  async getArticle(slug: string): Promise<ApiResponse<Article | null>> {
    if (USE_MOCK) {
      await simulateDelay(200);
      const article = MOCK_ARTICLES.find((a) => a.slug === slug || a.id === slug) || null;
      return {
        success: !!article,
        data: article,
        message: article ? "Article found" : "Article not found",
      };
    }

    const res = await api.get<ApiResponse<Article>>(`/articles/${slug}`);
    return res.data;
  },

  // Helper for admin modifications in mock mode
  _updateLocalProduct(updated: Product) {
    const idx = localProducts.findIndex((p) => p.id === updated.id);
    if (idx !== -1) {
      localProducts[idx] = updated;
    } else {
      localProducts.push(updated);
    }
  },

  _getAllLocalProducts() {
    return localProducts;
  },
};
