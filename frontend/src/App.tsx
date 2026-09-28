import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [healthStatus, setHealthStatus] = useState<string>('Checking...');

  useEffect(() => {
    // Basic health check to the Spring Boot Backend
    axios.get('http://localhost:8080/api/health')
      .then(response => {
        setHealthStatus(response.data.status === 'UP' ? 'Connected \u2714\uFE0F' : 'Down \u274C');
      })
      .catch(error => {
        console.error("Health check failed", error);
        setHealthStatus('Disconnected \u274C');
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Retail Inventory System</h1>
        <p className="text-gray-600 mb-6">Frontend is running successfully.</p>
        
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-md">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Backend Connection Status</h2>
          <div className="flex items-center justify-center space-x-2">
            <span className={`h-3 w-3 rounded-full ${healthStatus.includes('Connected') ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="font-medium text-gray-700">{healthStatus}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
