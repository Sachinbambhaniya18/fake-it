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
      setError(err instanceof Error ? err.message : 'Failed to fetch mocks');

      setMocks([
        {
          id: '1',
          name: 'User Profile API',
          path: '/api/v1/user/profile',
          method: 'GET',
          statusCode: 200,
          responseBody: { id: 1, name: 'John Doe', email: 'john@example.com' },
          enabled: true,
        },
        {
          id: '2',
          name: 'Create Post API',
          path: '/api/v1/posts',
          method: 'POST',
          statusCode: 201,
          responseBody: { id: 123, title: 'New Post', content: 'Post content' },
          enabled: false,
        },
      ]);
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