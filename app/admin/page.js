"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminToken, setAdminToken] = useState("");

  // Check if user is admin on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkAdminStatus(token);
    } else {
      setError("Please login to access admin panel");
      setLoading(false);
    }
  }, []);

  const checkAdminStatus = async (token) => {
    try {
      const response = await fetch("https://g2ixr6izoi1zdq-8000.proxy.runpod.net/admin/check", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      if (response.ok) {
        setIsAdmin(true);
        setAdminToken(token);
        fetchUsers(token);
      } else {
        setError("Access denied. Admin privileges required.");
        setLoading(false);
      }
    } catch (error) {
      setError("Connection error. Please try again.");
      setLoading(false);
    }
  };

  const fetchUsers = async (token) => {
    try {
      const response = await fetch("https://g2ixr6izoi1zdq-8000.proxy.runpod.net/admin/users", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
      } else {
        setError("Failed to fetch users");
      }
    } catch (error) {
      setError("Connection error while fetching users");
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async (userId) => {
    try {
      const response = await fetch(`https://g2ixr6izoi1zdq-8000.proxy.runpod.net/admin/users/${userId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${adminToken}`,
          "Content-Type": "application/json"
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSelectedUser(data);
      } else {
        setError("Failed to fetch user details");
      }
    } catch (error) {
      setError("Connection error while fetching user details");
    }
  };

  const makeUserAdmin = async (userId) => {
    try {
      const response = await fetch(`https://g2ixr6izoi1zdq-8000.proxy.runpod.net/admin/users/${userId}/admin`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${adminToken}`,
          "Content-Type": "application/json"
        }
      });
      
      if (response.ok) {
        // Refresh users list
        fetchUsers(adminToken);
        setSelectedUser(null);
      } else {
        setError("Failed to update user admin status");
      }
    } catch (error) {
      setError("Connection error while updating user");
    }
  };

  const resetUserUsage = async (userId) => {
    try {
      const response = await fetch(`https://g2ixr6izoi1zdq-8000.proxy.runpod.net/admin/users/${userId}/reset-usage`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${adminToken}`,
          "Content-Type": "application/json"
        }
      });
      
      if (response.ok) {
        // Refresh users list
        fetchUsers(adminToken);
        setSelectedUser(null);
      } else {
        setError("Failed to reset user usage");
      }
    } catch (error) {
      setError("Connection error while resetting usage");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-white/80 mt-4">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 font-sans flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
            <p className="text-white/80 mb-6">{error}</p>
            <button 
              onClick={() => window.location.href = "/"}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 font-sans">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-2xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
            <button 
              onClick={() => window.location.href = "/"}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Users List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Users Table */}
          <Card className="bg-white/10 backdrop-blur-2xl border border-white/20">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Users</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {users.map((user) => (
                  <div 
                    key={user.id} 
                    className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                    onClick={() => getUserDetails(user.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-semibold">{user.email}</h3>
                        <p className="text-white/70 text-sm">
                          {user.is_admin ? "Admin" : "User"} • 
                          Usage: {user.monthly_usage || 0} words
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-white/60 text-sm">
                          {user.is_admin ? "👑" : "👤"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Details */}
          <Card className="bg-white/10 backdrop-blur-2xl border border-white/20">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">User Details</h2>
              {selectedUser ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-white font-semibold text-lg">{selectedUser.email}</h3>
                    <p className="text-white/70">
                      Status: {selectedUser.is_admin ? "Admin" : "User"}
                    </p>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Monthly Usage</h4>
                    <div className="space-y-2">
                      <p className="text-white/80">Humanize: {selectedUser.humanize_usage || 0} words</p>
                      <p className="text-white/80">Power: {selectedUser.power_usage || 0} words</p>
                      <p className="text-white/80">Paraphrase: {selectedUser.paraphrase_usage || 0} words</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => makeUserAdmin(selectedUser.id)}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      {selectedUser.is_admin ? "Remove Admin" : "Make Admin"}
                    </Button>
                    <Button
                      onClick={() => resetUserUsage(selectedUser.id)}
                      className="bg-orange-600 hover:bg-orange-700 text-white"
                    >
                      Reset Usage
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-white/60">Select a user to view details</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 