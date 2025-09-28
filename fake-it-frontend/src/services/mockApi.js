const BASE_URL =
  import.meta.env.VITE_FAKE_IT_BASE_URL || "http://localhost:8080/fake-it/v1";

export class MockApiService {
  static instance = null;

  constructor() {}

  static getInstance() {
    if (!MockApiService.instance) {
      MockApiService.instance = new MockApiService();
    }
    return MockApiService.instance;
  }

  async createMock(mockData) {
    try {
      const response = await fetch(`${BASE_URL}/mocks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    } catch (error) {
      console.error("Error creating mock:", error);
      throw error;
    }
  }

  async getMocks() {
    try {
      const response = await fetch(`${BASE_URL}/mocks`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching mocks:", error);
      throw error;
    }
  }

  async getMockById(id) {
    try {
      const response = await fetch(`${BASE_URL}/mocks/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching mock:", error);
      throw error;
    }
  }

  async deleteMock(id) {
    try {
      const response = await fetch(`${BASE_URL}/mocks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    } catch (error) {
      console.error("Error deleting mock:", error);
      throw error;
    }
  }

  async toggleMock(id) {
    try {
      const response = await fetch(`${BASE_URL}/mocks/${id}/toggle`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
      
    } catch (error) {
      console.error("Error toggling mock:", error);
      throw error;
    }
  }

  async testMock(mockUrl, method, body) {
    try {
      const headers = {};
      if (body) {
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(mockUrl, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      let responseData;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        responseData = JSON.stringify(await response.json(), null, 2);
      } else {
        responseData = await response.text();
      }

      return {
        status: response.status,
        statusText: response.statusText,
        data: responseData,
      };
    } catch (error) {
      console.error("Error testing mock:", error);
      throw error;
    }
  }

  /**
   * Update an existing mock
   */
  async updateMock(id, mockData) {
    try {
      const response = await fetch(`${BASE_URL}/mocks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating mock:", error);
      throw error;
    }
  }
}
