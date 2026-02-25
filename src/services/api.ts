const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getHeaders = (token?: string) => {
  const headers: any = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

// Auth Service
export const authService = {
  signup: async (email: string, password: string, firstName: string, lastName: string) => {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password, firstName, lastName })
    });
    return response.json();
  },

  login: async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password })
    });
    return response.json();
  }
};

// Wedding Service
export const weddingService = {
  create: async (data: any, token: string) => {
    const response = await fetch(`${API_URL}/weddings`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(data)
    });
    return response.json();
  },

  getAll: async (token: string) => {
    const response = await fetch(`${API_URL}/weddings/my-weddings`, {
      headers: getHeaders(token)
    });
    return response.json();
  },

  getById: async (id: number) => {
    const response = await fetch(`${API_URL}/weddings/${id}`);
    return response.json();
  },

  update: async (id: number, data: any, token: string) => {
    const response = await fetch(`${API_URL}/weddings/${id}`, {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(data)
    });
    return response.json();
  },

  publish: async (id: number, token: string) => {
    const response = await fetch(`${API_URL}/weddings/${id}/publish`, {
      method: 'POST',
      headers: getHeaders(token)
    });
    return response.json();
  },

  getStats: async (id: number) => {
    const response = await fetch(`${API_URL}/weddings/${id}/stats`);
    return response.json();
  }
};

// Guest Service
export const guestService = {
  add: async (data: any) => {
    const response = await fetch(`${API_URL}/guests`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return response.json();
  },

  getWeddingGuests: async (weddingId: number) => {
    const response = await fetch(`${API_URL}/guests/wedding/${weddingId}`);
    return response.json();
  },

  update: async (id: number, data: any) => {
    const response = await fetch(`${API_URL}/guests/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return response.json();
  },

  updateRsvp: async (id: number, rsvpStatus: string, rsvpCount: number) => {
    const response = await fetch(`${API_URL}/guests/${id}/rsvp`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ rsvpStatus, rsvpCount })
    });
    return response.json();
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_URL}/guests/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return response.json();
  }
};

// Product Service
export const productService = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/products`);
    return response.json();
  },

  getByCategory: async (category: string) => {
    const response = await fetch(`${API_URL}/products/category/${category}`);
    return response.json();
  },

  getById: async (id: number) => {
    const response = await fetch(`${API_URL}/products/${id}`);
    return response.json();
  },

  getCategories: async () => {
    const response = await fetch(`${API_URL}/products/categories`);
    return response.json();
  }
};
