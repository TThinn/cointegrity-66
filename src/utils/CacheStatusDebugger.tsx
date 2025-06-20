import React, { useEffect, useState } from 'react';
import { CacheManager } from './cacheManager';

interface CacheStatusData {
  version: string | null;
  buildTimestamp: string;
  shouldInvalidate: boolean;
}

export const CacheStatusDebugger: React.FC = () => {
  const [status, setStatus] = useState<CacheStatusData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStatus = async () => {
      try {
        const cacheStatus = await CacheManager.getCacheStatus();
        setStatus(cacheStatus);
      } catch (error) {
        console.error('Failed to load cache status:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStatus();
  }, []);

  if (loading) {
    return <div>Loading cache status...</div>;
  }

  if (!status) {
    return <div>Failed to load cache status</div>;
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg text-sm">
      <h3 className="font-bold mb-2">Cache Status</h3>
      <div className="space-y-2">
        <p>Version: {status.version || 'Not set'}</p>
        <p>Build: {status.buildTimestamp}</p>
        <p>Should Invalidate: {status.shouldInvalidate ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};
