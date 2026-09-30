import React from 'react';
import { FileText, Download, BarChart2, PieChart } from 'lucide-react';

export default function Reports() {
  const downloadCsv = (endpoint: string, filename: string) => {
    // Standard way to trigger a browser download from a raw file API endpoint using a JWT
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8080/api/reports/${endpoint}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
    .catch(err => console.error("Download failed", err));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Business Reports</h1>
        <p className="text-slate-500 mt-1">Export your data for external accounting and analytics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Product Master List</h3>
              <p className="text-sm text-slate-500">Complete catalog with pricing and SKUs</p>
            </div>
          </div>
          <button onClick={() => downloadCsv('inventory/csv', 'inventory_report.csv')} className="w-full mt-2 flex items-center justify-center space-x-2 bg-slate-900 text-white px-4 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
            <Download className="w-4 h-4" /> <span>Download CSV</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
              <BarChart2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Sales & Fulfillment</h3>
              <p className="text-sm text-slate-500">Historical order log and total revenues</p>
            </div>
          </div>
          <button onClick={() => downloadCsv('sales/csv', 'sales_report.csv')} className="w-full mt-2 flex items-center justify-center space-x-2 bg-emerald-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors">
            <Download className="w-4 h-4" /> <span>Download CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
}

