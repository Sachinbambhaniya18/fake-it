import { useState, useEffect, useCallback } from 'react';
import { MockApiService } from '../services/mockApi';

export const useMocks = () => {
  const [mocks, setMocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMocks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await MockApiService.getInstance().getMocks();

      let mocksData = [];
      if (Array.isArray(response)) {
        mocksData = response;
      } else if (response && response.data && Array.isArray(response.data)) {
        mocksData = response.data;
      } else if (response && Array.isArray(response.mocks)) {
        mocksData = response.mocks;
      }
      setMocks(mocksData);
    } catch (err) {
      setError(err instanceof Error ? "No mocks found" : 'Failed to fetch mocks. Please try again later.');

      setMocks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMocks();
  }, [fetchMocks]);

  const refreshMocks = useCallback(() => {
    fetchMocks();
  }, [fetchMocks]);

  return { mocks, loading, error, refreshMocks };
};