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
      console.log("Checking admin status with token:", token ? "Token exists" : "No token");
      
      // Try to fetch users - if we get 403, user is not admin
      const response = await fetch("https://g2ixr6izoi1zdq-8000.proxy.runpod.net/admin/users", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      console.log("Admin check response status:", response.status);
      
      if (response.ok) {
        setIsAdmin(true);
        setAdminToken(token);
        const data = await response.json();
        setUsers(data.users || []);
        setLoading(false);
      } else if (response.status === 403) {
        setError("Access denied. Admin privileges required.");
        setLoading(false);
      } else {
        const errorText = await response.text();
        console.log("Admin check error response:", errorText);
        setError(`Failed to verify admin status. Status: ${response.status}`);
        setLoading(false);
      }
    } catch (error) {
      console.log("Admin check error:", error);
      setError("Connection error. Please try again.");
      setLoading(false);
    }
  };

  const getUserDetails = async (userId) => {
    try {
      const response = await fetch(`https://g2ixr6izoi1zdq-8000.proxy.runpod.net/admin/user/${userId}`, {
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
      const response = await fetch(`https://g2ixr6izoi1zdq-8000.proxy.runpod.net/admin/make-admin/${userId}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${adminToken}`,
          "Content-Type": "application/json"
        }
      });
      
      if (response.ok) {
        // Refresh users list
        const refreshResponse = await fetch("https://g2ixr6izoi1zdq-8000.proxy.runpod.net/admin/users", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${adminToken}`,
            "Content-Type": "application/json"
          }
        });
        
        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          setUsers(data.users || []);
        }
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
      const response = await fetch(`https://g2ixr6izoi1zdq-8000.proxy.runpod.net/admin/reset-usage/${userId}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${adminToken}`,
          "Content-Type": "application/json"
        }
      });
      
      if (response.ok) {
        // Refresh users list
        const refreshResponse = await fetch("https://g2ixr6izoi1zdq-8000.proxy.runpod.net/admin/users", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${adminToken}`,
            "Content-Type": "application/json"
          }
        });
        
        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          setUsers(data.users || []);
        }
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Access Denied</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={() => window.location.href = "/"} className="w-full">
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button onClick={() => window.location.href = "/"} className="text-gray-600 hover:text-gray-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Admin Access</span>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-semibold text-gray-900">{users.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-semibold text-gray-900">{users.filter(u => u.is_active).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Admins</p>
                  <p className="text-2xl font-semibold text-gray-900">{users.filter(u => u.is_admin).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Usage</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {users.reduce((sum, user) => sum + (user.monthly_usage || 0), 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
              <Button onClick={() => window.location.reload()} variant="outline">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Refresh
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                              <span className="text-sm font-medium text-purple-800">
                                {user.email.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.email.split('@')[0]}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.is_admin ? 'Admin' : 'User'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.monthly_usage ? user.monthly_usage.toLocaleString() : '0'} words
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => getUserDetails(user.id)}
                            size="sm"
                            variant="outline"
                          >
                            Details
                          </Button>
                          {!user.is_admin && (
                            <Button
                              onClick={() => makeUserAdmin(user.id)}
                              size="sm"
                              variant="outline"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Make Admin
                            </Button>
                          )}
                          <Button
                            onClick={() => resetUserUsage(user.id)}
                            size="sm"
                            variant="outline"
                            className="text-orange-600 hover:text-orange-800"
                          >
                            Reset Usage
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* User Details Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">User Details</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email:</label>
                    <p className="text-sm text-gray-900">{selectedUser.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status:</label>
                    <p className="text-sm text-gray-900">
                      {selectedUser.is_active ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Role:</label>
                    <p className="text-sm text-gray-900">
                      {selectedUser.is_admin ? 'Admin' : 'User'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Monthly Usage:</label>
                    <p className="text-sm text-gray-900">
                      {selectedUser.monthly_usage ? selectedUser.monthly_usage.toLocaleString() : '0'} words
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Created:</label>
                    <p className="text-sm text-gray-900">
                      {new Date(selectedUser.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button onClick={() => setSelectedUser(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 