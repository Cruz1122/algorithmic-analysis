"use client";

import { useEffect, useState } from "react";

type BackendStatus = 'active' | 'warning' | 'error' | 'loading';

export default function HealthStatus() {
  const [status, setStatus] = useState<BackendStatus>('loading');

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch('/api/health');
        
        if (response.ok) {
          const data = await response.json();
          // Determinar estado basado en la respuesta
          if (data.status === 'ok') {
            setStatus('active');
          } else if (data.status === 'warning') {
            setStatus('warning');
          } else {
            setStatus('error');
          }
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    };

    checkBackend();
    const interval = setInterval(checkBackend, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusConfig = (status: BackendStatus) => {
    switch (status) {
      case 'active':
        return {
          color: 'bg-green-500',
          text: 'Backend conectado',
          textColor: 'text-green-400'
        };
      case 'warning':
        return {
          color: 'bg-yellow-500',
          text: 'Backend con advertencia',
          textColor: 'text-yellow-400'
        };
      case 'error':
        return {
          color: 'bg-red-500',
          text: 'Backend desconectado',
          textColor: 'text-red-400'
        };
      case 'loading':
        return {
          color: 'bg-gray-500 animate-pulse',
          text: 'Verificando backend...',
          textColor: 'text-gray-400'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className="glass-card p-4 rounded-md">
      <div className="flex items-center gap-3">
        <div className={`h-3 w-3 rounded-full ${config.color}`}></div>
        <span className={`text-sm font-medium ${config.textColor}`}>
          {config.text}
        </span>
      </div>
    </div>
  );
}
