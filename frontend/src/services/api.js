import axios from 'axios';

// Base API instance
const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Categories API
export const fetchActiveCategories = async () => {
  try {
    const response = await API.get('/categories');
    return response.data?.data || [];
  } catch (error) {
    console.warn('API Error fetching categories, falling back:', error.message);
    return null;
  }
};

// Products API
export const fetchActiveProducts = async () => {
  try {
    const response = await API.get('/products');
    return response.data?.data || [];
  } catch (error) {
    console.warn('API Error fetching products, falling back:', error.message);
    return null;
  }
};

export const fetchProductBySlug = async (slug) => {
  try {
    const response = await API.get(`/products/slug/${slug}`);
    return response.data?.data || null;
  } catch (error) {
    console.warn(`API Error fetching product by slug ${slug}:`, error.message);
    return null;
  }
};

export const fetchProductsByCategory = async (categoryIdentifier) => {
  try {
    const response = await API.get(`/products/category/${categoryIdentifier}`);
    return response.data?.data || [];
  } catch (error) {
    console.warn(`API Error fetching products for category ${categoryIdentifier}:`, error.message);
    return null;
  }
};

// Hero Slides API
export const fetchHeroSlides = async () => {
  try {
    const response = await API.get('/hero-slides');
    return response.data?.data || [];
  } catch (error) {
    console.warn('API Error fetching hero slides:', error.message);
    return null;
  }
};

// Documents API
export const fetchDocuments = async (categoryIdentifier = null) => {
  try {
    const endpoint = categoryIdentifier
      ? `/documents/category/${categoryIdentifier}`
      : '/documents';
    const response = await API.get(endpoint);
    return response.data?.data || [];
  } catch (error) {
    console.warn('API Error fetching documents:', error.message);
    return null;
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
  try {
    const response = await API.get('/company');
    return response.data?.data || null;
  } catch (error) {
    console.warn('API Error fetching company info:', error.message);
    return null;
  }
};

export default API;
