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
    const result = await response.json();
    if (result.wedding) {
      result.wedding = normalizeWedding(result.wedding);
    }
    return result;
  },

  getAll: async (token: string) => {
    const response = await fetch(`${API_URL}/weddings/my-weddings`, {
      headers: getHeaders(token)
    });
    const data = await response.json();
    if (Array.isArray(data.weddings)) {
      data.weddings = data.weddings.map(normalizeWedding);
    }
    return data;
  },

  getById: async (id: number) => {
    const response = await fetch(`${API_URL}/weddings/${id}`);
    const data = await response.json();
    if (data.wedding) {
      data.wedding = normalizeWedding(data.wedding);
    }
    return data;
  },

  update: async (id: number, data: any, token: string) => {
    const response = await fetch(`${API_URL}/weddings/${id}`, {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (result.wedding) {
      result.wedding = normalizeWedding(result.wedding);
    }
    return result;
  },

  publish: async (id: number, token: string) => {
    const response = await fetch(`${API_URL}/weddings/${id}/publish`, {
      method: 'POST',
      headers: getHeaders(token)
    });
    const result = await response.json();
    if (result.wedding) {
      result.wedding = normalizeWedding(result.wedding);
    }
    return result;
  },

  getStats: async (id: number) => {
    const response = await fetch(`${API_URL}/weddings/${id}/stats`);
    const data = await response.json();
    if (data.stats) {
      data.stats = normalizeGuestStats(data.stats);
    }
    return data;
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
    const data = await response.json();
    if (Array.isArray(data.guests)) {
      data.guests = data.guests.map(normalizeGuest);
    }
    return data;
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
    const data = await response.json();
    if (Array.isArray(data.products)) {
      data.products = data.products.map(normalizeProduct);
    }
    return data;
  },

  getByCategory: async (category: string) => {
    const response = await fetch(`${API_URL}/products/category/${category}`);
    return response.json();
  },

  getById: async (id: number) => {
    const response = await fetch(`${API_URL}/products/${id}`);
    const data = await response.json();
    if (data.product) {
      data.product = normalizeProduct(data.product);
    }
    return data;
  },

  getCategories: async () => {
    const response = await fetch(`${API_URL}/products/categories`);
    return response.json();
  }
};

const featureList = async (weddingId: number, feature: string) => {
  const response = await fetch(`${API_URL}/weddings/${weddingId}/${feature}`);
  return response.json();
};

const featureCreate = async (weddingId: number, feature: string, data: any, token: string) => {
  const response = await fetch(`${API_URL}/weddings/${weddingId}/${feature}`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(data)
  });
  return response.json();
};

const featureUpdate = async (weddingId: number, feature: string, itemId: number, data: any, token: string) => {
  const response = await fetch(`${API_URL}/weddings/${weddingId}/${feature}/${itemId}`, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify(data)
  });
  return response.json();
};

const featureDelete = async (weddingId: number, feature: string, itemId: number, token: string) => {
  const response = await fetch(`${API_URL}/weddings/${weddingId}/${feature}/${itemId}`, {
    method: 'DELETE',
    headers: getHeaders(token)
  });
  return response.json();
};

export const checklistService = {
  getAll: async (weddingId: number) => {
    const data = await featureList(weddingId, 'checklist');
    return { checklist: (data.checklist || []).map(normalizeChecklist) };
  },
  create: (weddingId: number, payload: any, token: string) => featureCreate(weddingId, 'checklist', payload, token),
  update: (weddingId: number, itemId: number, payload: any, token: string) => featureUpdate(weddingId, 'checklist', itemId, payload, token),
  delete: (weddingId: number, itemId: number, token: string) => featureDelete(weddingId, 'checklist', itemId, token),
};

export const timelineService = {
  getAll: async (weddingId: number) => {
    const data = await featureList(weddingId, 'timeline');
    return { timeline: (data.timeline || []).map(normalizeTimeline) };
  },
  create: (weddingId: number, payload: any, token: string) => featureCreate(weddingId, 'timeline', payload, token),
  update: (weddingId: number, itemId: number, payload: any, token: string) => featureUpdate(weddingId, 'timeline', itemId, payload, token),
  delete: (weddingId: number, itemId: number, token: string) => featureDelete(weddingId, 'timeline', itemId, token),
};

export const budgetService = {
  getAll: async (weddingId: number) => {
    const data = await featureList(weddingId, 'budget');
    return { budget: (data.budget || []).map(normalizeBudget) };
  },
  create: (weddingId: number, payload: any, token: string) => featureCreate(weddingId, 'budget', payload, token),
  update: (weddingId: number, itemId: number, payload: any, token: string) => featureUpdate(weddingId, 'budget', itemId, payload, token),
  delete: (weddingId: number, itemId: number, token: string) => featureDelete(weddingId, 'budget', itemId, token),
};

export const faqService = {
  getAll: async (weddingId: number) => {
    const data = await featureList(weddingId, 'faq');
    return { faq: (data.faq || []).map(normalizeFaq) };
  },
  create: (weddingId: number, payload: any, token: string) => featureCreate(weddingId, 'faq', payload, token),
  update: (weddingId: number, itemId: number, payload: any, token: string) => featureUpdate(weddingId, 'faq', itemId, payload, token),
  delete: (weddingId: number, itemId: number, token: string) => featureDelete(weddingId, 'faq', itemId, token),
};

export const galleryService = {
  getAll: async (weddingId: number) => {
    const data = await featureList(weddingId, 'gallery');
    return { gallery: (data.gallery || []).map(normalizeGalleryItem) };
  },
  create: (weddingId: number, payload: any, token: string) => featureCreate(weddingId, 'gallery', payload, token),
  delete: (weddingId: number, itemId: number, token: string) => featureDelete(weddingId, 'gallery', itemId, token),
};

export const registryService = {
  getAll: async (weddingId: number) => {
    const data = await featureList(weddingId, 'registry');
    return { registry: (data.registry || []).map(normalizeRegistryItem) };
  },
  create: (weddingId: number, payload: any, token: string) => featureCreate(weddingId, 'registry', payload, token),
  update: (weddingId: number, itemId: number, payload: any, token: string) => featureUpdate(weddingId, 'registry', itemId, payload, token),
  delete: (weddingId: number, itemId: number, token: string) => featureDelete(weddingId, 'registry', itemId, token),
};

function normalizeWedding(row: any) {
  if (!row) return row;
  return {
    ...row,
    userId: row.userId ?? row.user_id,
    groomName: row.groomName ?? row.groom_name,
    brideName: row.brideName ?? row.bride_name,
    weddingDate: row.weddingDate ?? row.wedding_date,
    weddingTime: row.weddingTime ?? row.wedding_time,
    isPublished: row.isPublished ?? row.is_published,
    tierId: row.tierId ?? row.tier_id,
    createdAt: row.createdAt ?? row.created_at,
    updatedAt: row.updatedAt ?? row.updated_at,
  };
}

function normalizeGuest(row: any) {
  if (!row) return row;
  return {
    ...row,
    weddingId: row.weddingId ?? row.wedding_id,
    dietaryRequirements: row.dietaryRequirements ?? row.dietary_requirements,
    rsvpStatus: row.rsvpStatus ?? row.rsvp_status,
    rsvpCount: row.rsvpCount ?? row.rsvp_count,
    createdAt: row.createdAt ?? row.created_at,
    updatedAt: row.updatedAt ?? row.updated_at,
  };
}

function normalizeProduct(row: any) {
  if (!row) return row;
  return {
    ...row,
    imageUrl: row.imageUrl ?? row.image_url,
    stockQuantity: row.stockQuantity ?? row.stock_quantity,
    vendorId: row.vendorId ?? row.vendor_id,
    isOwnProduct: row.isOwnProduct ?? row.is_own_product,
    createdAt: row.createdAt ?? row.created_at,
    updatedAt: row.updatedAt ?? row.updated_at,
  };
}

function normalizeChecklist(row: any) {
  if (!row) return row;
  return {
    ...row,
    weddingId: row.weddingId ?? row.wedding_id,
    itemName: row.itemName ?? row.item_name,
    isCompleted: row.isCompleted ?? row.is_completed,
    dueDate: row.dueDate ?? row.due_date,
    assignedTo: row.assignedTo ?? row.assigned_to,
  };
}

function normalizeTimeline(row: any) {
  if (!row) return row;
  return {
    ...row,
    weddingId: row.weddingId ?? row.wedding_id,
    startTime: row.startTime ?? row.start_time,
    endTime: row.endTime ?? row.end_time,
  };
}

function normalizeBudget(row: any) {
  if (!row) return row;
  return {
    ...row,
    weddingId: row.weddingId ?? row.wedding_id,
    budgetedAmount: row.budgetedAmount ?? row.budgeted_amount,
    actualAmount: row.actualAmount ?? row.actual_amount,
    createdAt: row.createdAt ?? row.created_at,
    updatedAt: row.updatedAt ?? row.updated_at,
  };
}

function normalizeFaq(row: any) {
  if (!row) return row;
  return {
    ...row,
    weddingId: row.weddingId ?? row.wedding_id,
    orderIndex: row.orderIndex ?? row.order_index,
    createdAt: row.createdAt ?? row.created_at,
  };
}

function normalizeGalleryItem(row: any) {
  if (!row) return row;
  return {
    ...row,
    weddingId: row.weddingId ?? row.wedding_id,
    imageUrl: row.imageUrl ?? row.image_url,
    uploadedAt: row.uploadedAt ?? row.uploaded_at,
  };
}

function normalizeRegistryItem(row: any) {
  if (!row) return row;
  return {
    ...row,
    weddingId: row.weddingId ?? row.wedding_id,
    productId: row.productId ?? row.product_id,
    quantityNeeded: row.quantityNeeded ?? row.quantity_needed,
    quantityReceived: row.quantityReceived ?? row.quantity_received,
    giftUrl: row.giftUrl ?? row.gift_url,
    createdAt: row.createdAt ?? row.created_at,
  };
}

function normalizeGuestStats(row: any) {
  if (!row) return row;
  return {
    totalGuests: Number(row.totalGuests ?? row.total_guests ?? 0),
    confirmedCount: Number(row.confirmedCount ?? row.confirmed_count ?? 0),
    declinedCount: Number(row.declinedCount ?? row.declined_count ?? 0),
    pendingCount: Number(row.pendingCount ?? row.pending_count ?? 0),
  };
}
