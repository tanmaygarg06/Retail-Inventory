import React, { useState, useEffect } from 'react';
import { Users as UsersIcon, Shield, Search, MoreVertical, Edit, ShieldAlert } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../store/AuthContext';

export default function Users() {
  const { user: authUser } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8080/api/users');
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusChange = async (userId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    if(confirm(`Are you sure you want to change this user's status to ${newStatus}?`)) {
      try {
        await axios.put(`http://localhost:8080/api/users/${userId}/status`, { status: newStatus });
        fetchUsers();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Administration</h1>
          <p className="text-slate-500 mt-1">Manage system access, roles, and employee accounts.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between bg-slate-50">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input type="text" placeholder="Search users by name or email..." className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-medium">
                <th className="p-4">User</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">Loading users...</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">No users found.</td></tr>
              ) : (
                users.map((u, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-sm">
                    <td className="p-4 flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
                        {u.username?.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="font-bold text-slate-900">{u.username}</span>
                    </td>
                    <td className="p-4 text-slate-600">{u.email || 'No email provided'}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
                        <Shield className="w-3 h-3 mr-1" />
                        {u.roles?.length > 0 ? u.roles[0].name : 'USER'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${u.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'}`}>
                        {u.status || 'ACTIVE'}
                      </span>
                    </td>
                    <td className="p-4 text-right flex justify-end space-x-2">
                      <button 
                        onClick={() => handleStatusChange(u.id, u.status || 'ACTIVE')} 
                        title={u.status === 'ACTIVE' ? "Suspend User" : "Activate User"}
                        className={`p-1.5 rounded transition-colors ${u.status === 'ACTIVE' ? 'text-slate-400 hover:text-rose-600 hover:bg-rose-50' : 'text-rose-500 hover:text-emerald-600 hover:bg-emerald-50'}`}
                      >
                        <ShieldAlert className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

