import { useEffect, useCallback } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

// Generate a unique visitor ID
const generateVisitorId = () => {
  let visitorId = localStorage.getItem('visitorId');
  if (!visitorId) {
    visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('visitorId', visitorId);
  }
  return visitorId;
};

// Generate a session ID
const generateSessionId = () => {
  let sessionId = sessionStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

export const useAnalytics = () => {
  const trackPageVisit = useCallback(async (pageUrl, pageName) => {
    try {
      const visitorId = generateVisitorId();
      const sessionId = generateSessionId();
      
      const trackingData = {
        pageUrl,
        pageName,
        visitorId,
        sessionId,
        userAgent: navigator.userAgent,
        referrer: document.referrer || null
      };

      const response = await fetch(`${API_BASE_URL}/api/analytics/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trackingData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Page visit tracked:', result);
        return result;
      }
    } catch (error) {
      console.error('Error tracking page visit:', error);
    }
  }, []);

  const trackEvent = useCallback(async (eventName, eventData = {}) => {
    try {
      const visitorId = generateVisitorId();
      const sessionId = generateSessionId();
      
      const eventPayload = {
        eventName,
        eventData,
        visitorId,
        sessionId,
        timestamp: new Date().toISOString(),
        pageUrl: window.location.pathname
      };

      // You can extend this to track custom events
      console.log('Event tracked:', eventPayload);
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }, []);

  return {
    trackPageVisit,
    trackEvent,
    generateVisitorId,
    generateSessionId
  };
};
