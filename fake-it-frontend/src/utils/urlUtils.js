/**
 * Utility functions for URL handling and dynamic base URL detection
 */

export class UrlUtils {
  /**
   * Dynamically detect the base URL from the current environment
   */
  static getBaseUrl() {
    // In development, use the configured mock URL or default
    if (import.meta.env.DEV) {
      return import.meta.env.VITE_FAKE_IT_MOCK_URL || 'http://localhost:8080';
    }
    
    // In production, use the current origin
    return window.location.origin;
  }

  /**
   * Generate a complete API URL by combining base URL with endpoint path
   */
  static generateApiUrl(path) {
    const baseUrl = this.getBaseUrl();
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`;
  }

  /**
   * Copy text to clipboard with fallback support
   */
  static async copyToClipboard(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const result = document.execCommand('copy');
        textArea.remove();
        return result;
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  }

  /**
   * Validate if a URL is properly formatted
   */
  static isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Extract the path from a full URL
   */
  static extractPath(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.pathname;
    } catch {
      return url.startsWith('/') ? url : `/${url}`;
    }
  }
}