import axios from "axios";

// In-memory cache store
const apiCache = new Map();
// In-flight pending requests store (prevents duplicate simultaneous requests)
const pendingRequests = new Map();

export const clearApiCache = (keyPrefix = null) => {
  if (!keyPrefix) {
    apiCache.clear();
  } else {
    for (const key of apiCache.keys()) {
      if (key.startsWith(keyPrefix)) {
        apiCache.delete(key);
      }
    }
  }
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 25000,
});

// Attach Authorization Bearer token to all outgoing requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handles 401 and invalidates cache on mutating requests
api.interceptors.response.use(
  (response) => {
    const method = response.config.method?.toUpperCase();
    // If a mutation was successful (POST, PUT, PATCH, DELETE), clear the related cache
    if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
      clearApiCache();
    }
    return response;
  },
  (error) => {
    // Only auto-logout on explicit 401 Unauthorized from auth verification,
    // NOT on network timeouts or 502/503 Render cold start errors!
    if (error.response && error.response.status === 401) {
      // Don't auto-redirect if we're already on the login page or trying to login
      const isAuthUrl = error.config?.url?.includes("/auth/login");
      if (!isAuthUrl && window.location.pathname !== "/login") {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Cached GET request wrapper with TTL and in-flight deduplication.
 * @param {string} url Request URL
 * @param {object} [config] Axios config + optional { ttl: ms, bypassCache: bool }
 */
export const cachedGet = async (url, config = {}) => {
  const { ttl = 30000, bypassCache = false, ...axiosConfig } = config;
  const cacheKey = `${url}:${JSON.stringify(axiosConfig.params || {})}`;

  if (!bypassCache) {
    const cached = apiCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.data;
    }
  }

  // Deduplicate simultaneous requests to the same URL
  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey);
  }

  const promise = api
    .get(url, axiosConfig)
    .then((res) => {
      apiCache.set(cacheKey, {
        timestamp: Date.now(),
        data: res.data,
      });
      return res.data;
    })
    .finally(() => {
      pendingRequests.delete(cacheKey);
    });

  pendingRequests.set(cacheKey, promise);
  return promise;
};

export default api;