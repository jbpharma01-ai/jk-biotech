import axios from 'axios';
import PRODUCTS from '../constants/products';

// Base API instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 25000,
});

// Client-side caching to prevent redundant requests and eliminate Render cold-start delays
const memoryCache = new Map();
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes TTL

const getCachedData = (key) => {
  const mem = memoryCache.get(key);
  if (mem && Date.now() - mem.timestamp < CACHE_TTL_MS) {
    return mem.data;
  }
  try {
    const raw = typeof window !== 'undefined' ? sessionStorage.getItem(`jk_cache_${key}`) : null;
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
        memoryCache.set(key, parsed);
        return parsed.data;
      }
    }
  } catch (e) {
    // Ignore storage parse issues
  }
  return null;
};

const setCachedData = (key, data) => {
  if (!data) return;
  const entry = { data, timestamp: Date.now() };
  memoryCache.set(key, entry);
  try {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`jk_cache_${key}`, JSON.stringify(entry));
    }
  } catch (e) {
    // Ignore storage write issues (quota)
  }
};

// Categories API
export const fetchActiveCategories = async () => {
  const cacheKey = 'categories_active';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const response = await API.get('/categories');
    const data = response.data?.data || [];
    if (Array.isArray(data) && data.length > 0) {
      setCachedData(cacheKey, data);
    }
    return data;
  } catch (error) {
    console.warn('API Error fetching categories, falling back:', error.message);
    return [];
  }
};

// Products API with instant cache + stale-while-revalidate + fallback support
export const fetchActiveProducts = async (forceRefresh = false) => {
  const cacheKey = 'products_active';

  if (!forceRefresh) {
    const cached = getCachedData(cacheKey);
    if (cached && Array.isArray(cached) && cached.length > 0) {
      // Background stale-while-revalidate update
      API.get('/products')
        .then((response) => {
          const fresh = response.data?.data;
          if (Array.isArray(fresh) && fresh.length > 0) {
            setCachedData(cacheKey, fresh);
          }
        })
        .catch(() => {});
      return cached;
    }
  }

  try {
    const response = await API.get('/products');
    const data = response.data?.data;
    if (Array.isArray(data) && data.length > 0) {
      setCachedData(cacheKey, data);
      return data;
    }
    return PRODUCTS;
  } catch (error) {
    console.warn('API Error fetching products, falling back to catalog:', error.message);
    const cached = getCachedData(cacheKey);
    return (cached && cached.length > 0) ? cached : PRODUCTS;
  }
};

export const fetchProductBySlug = async (slug) => {
  if (!slug) return null;
  const cacheKey = `product_slug_${slug.toLowerCase()}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const response = await API.get(`/products/slug/${slug}`);
    const data = response.data?.data;
    if (data) {
      setCachedData(cacheKey, data);
      return data;
    }
  } catch (error) {
    console.warn(`API Error fetching product by slug ${slug}:`, error.message);
  }

  // Fallback to local catalog
  const fallback = PRODUCTS.find(
    (p) => p.slug && p.slug.toLowerCase() === slug.toLowerCase()
  );
  return fallback || null;
};

export const fetchProductsByCategory = async (categoryIdentifier) => {
  if (!categoryIdentifier) return [];
  const cacheKey = `products_cat_${categoryIdentifier.toLowerCase()}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const response = await API.get(`/products/category/${categoryIdentifier}`);
    const data = response.data?.data || [];
    if (Array.isArray(data) && data.length > 0) {
      setCachedData(cacheKey, data);
    }
    return data;
  } catch (error) {
    console.warn(`API Error fetching products for category ${categoryIdentifier}:`, error.message);
    // Fallback to local category products
    return PRODUCTS.filter(
      (p) => (p.category || '').toLowerCase() === categoryIdentifier.toLowerCase()
    );
  }
};

// Hero Slides API
export const fetchHeroSlides = async () => {
  const cacheKey = 'hero_slides';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const response = await API.get('/hero-slides');
    const data = response.data?.data || [];
    if (Array.isArray(data) && data.length > 0) {
      setCachedData(cacheKey, data);
    }
    return data;
  } catch (error) {
    console.warn('API Error fetching hero slides:', error.message);
    return [];
  }
};

// Contact Enquiry API
export const submitContactEnquiry = async (enquiryData) => {
  try {
    const response = await API.post('/enquiries', enquiryData);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Failed to submit enquiry. Please try again.';
    throw new Error(errorMessage);
  }
};

// Company Info API
export const fetchCompanyInfo = async () => {
  const cacheKey = 'company_info';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const response = await API.get('/company');
    const data = response.data?.data || null;
    if (data) {
      setCachedData(cacheKey, data);
    }
    return data;
  } catch (error) {
    console.warn('API Error fetching company info:', error.message);
    return null;
  }
};

export default API;
