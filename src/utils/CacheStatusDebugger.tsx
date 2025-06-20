
import React, { useEffect, useState } from 'react';
import { CacheManager } from './cacheManager';
import { getServiceWorkerStatus } from './serviceWorkerInit';

interface CacheStatusData {
  version: string | null;
  lastCheck: string | null;
  buildTimestamp: string;
  shouldInvalidate: boolean;
  cacheNames: string[];
  serviceWorkerStatus: boolean;
  storageUsage: number;
  metadata: any;
  swStatus: {
    isSupported: boolean;
    isActive: boolean;
    registration: ServiceWorkerRegistration | null;
    controller: ServiceWorker | null;
  };
}

export const CacheStatusDebugger: React.FC = () => {
  const [status, setStatus] = useState<CacheStatusData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStatus = async () => {
      try {
        const [cacheStatus, swStatus] = await Promise.all([
          CacheManager.getCacheStatus(),
          getServiceWorkerStatus()
        ]);

        setStatus({
          ...cacheStatus,
          swStatus
        });
      } catch (error) {
        console.error('Failed to load cache status:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStatus();

    // Listen for cache updates
    const handleCacheUpdate = () => {
      loadStatus();
    };

    window.addEventListener('cache-update-available', handleCacheUpdate);
    window.addEventListener('app-update-available', handleCacheUpdate);

    return () => {
      window.removeEventListener('cache-update-available', handleCacheUpdate);
      window.removeEventListener('app-update-available', handleCacheUpdate);
    };
  }, []);

  if (loading) {
    return <div>Loading cache status...</div>;
  }

  if (!status) {
    return <div>Failed to load cache status</div>;
  }

  const formatTimestamp = (timestamp: string | null) => {
    if (!timestamp) return 'Never';
    return new Date(parseInt(timestamp)).toLocaleString();
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg text-sm">
      <h3 className="font-bold mb-2">Cache Status (Phase 3)</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold">Cache Info</h4>
          <p>Version: {status.version || 'Not set'}</p>
          <p>Build: {status.buildTimestamp}</p>
          <p>Last Check: {formatTimestamp(status.lastCheck)}</p>
          <p>Should Invalidate: {status.shouldInvalidate ? 'Yes' : 'No'}</p>
          <p>Storage Usage: {formatBytes(status.storageUsage)}</p>
        </div>
        <div>
          <h4 className="font-semibold">Service Worker</h4>
          <p>Supported: {status.swStatus.isSupported ? 'Yes' : 'No'}</p>
          <p>Active: {status.swStatus.isActive ? 'Yes' : 'No'}</p>
          <p>Registration: {status.swStatus.registration ? 'Available' : 'None'}</p>
          <p>Controller: {status.swStatus.controller ? 'Active' : 'None'}</p>
        </div>
      </div>
      <div className="mt-2">
        <h4 className="font-semibold">Cache Names ({status.cacheNames.length})</h4>
        <div className="text-xs">
          {status.cacheNames.map(name => (
            <div key={name} className="truncate">{name}</div>
          ))}
        </div>
      </div>
      {status.metadata && (
        <div className="mt-2">
          <h4 className="font-semibold">Metadata</h4>
          <pre className="text-xs bg-white p-2 rounded overflow-auto">
            {JSON.stringify(status.metadata, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
