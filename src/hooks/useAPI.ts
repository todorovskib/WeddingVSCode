import { useState, useCallback } from 'react';

export const useAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(async (url: string, options?: RequestInit) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'An error occurred');
      }
      return await response.json();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, loading, error };
};

export const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const result = await response.json();
      setData(result.data || result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [url]);

  return { data, loading, error, refetch: fetchData };
};
