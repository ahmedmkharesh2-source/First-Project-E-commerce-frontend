import axios from "axios";
import React, { useEffect, useState } from "react";
import { Shield, User, Crown, Trash2 } from "lucide-react";

const ViewAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/users/get-all-users", { withCredentials: true });
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    setLoadingId(userId);
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/users/change-user-role/${userId}`,
        { role: newRole },
        { withCredentials: true }
      );
      setUsers((prev) => prev.map((u) => (u._id === userId ? { ...u, role: response.data.user.role } : u)));
    } catch (error) {
      alert(error?.response?.data?.message || "Failed");
    } finally {
      setLoadingId(null);
    }
  };

  // ✅ دالة الحذف
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setDeletingId(userId);
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/users/delete-user/${userId}`,
        { withCredentials: true }
      );
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to delete user");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-[#1e293b] rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden">

      {/* Header */}
      <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">All Users</h1>
          <p className="text-slate-400 text-sm mt-1">Manage user roles and permissions</p>
        </div>
        <div className="bg-[#0ea5e9]/15 text-[#0ea5e9] px-4 py-2 rounded-xl text-sm font-semibold">
          {users.length} Users
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">

          <thead className="bg-[#0f172a]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Profile</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Role</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Joined</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b border-slate-700/50 hover:bg-[#0f172a]/30 transition">

                <td className="px-6 py-4">
                  <img src={user.profile?.url || user.avatar || "https://i.pravatar.cc/100"} alt="profile" className="w-12 h-12 rounded-full border-2 border-slate-700 object-cover" />
                </td>

                <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                <td className="px-6 py-4 text-slate-400 text-sm">{user.email}</td>

                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium
                    ${user.role === "admin" ? "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30" : "bg-[#0ea5e9]/15 text-[#38bdf8] border border-[#0ea5e9]/30"}`}>
                    {user.role === "admin" ? <Crown size={12} /> : <User size={12} />}
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4 text-slate-400 text-sm">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                {/* ✅ Actions: Role + Delete */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <select
                      value={user.role}
                      disabled={loadingId === user._id}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="bg-[#0f172a] text-white border border-slate-600 rounded-xl px-3 py-2 text-sm focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 disabled:opacity-50 cursor-pointer outline-none">
                      <option value="user">👤 User</option>
                      <option value="admin">👑 Admin</option>
                    </select>

                    {/* ✅ زر الحذف */}
                    <button
                      onClick={() => handleDelete(user._id)}
                      disabled={deletingId === user._id}
                      className="p-2 bg-red-500/10 hover:bg-red-500/25 text-red-400 hover:text-red-300 border border-red-500/30 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete User"
                    >
                      {deletingId === user._id ? (
                        <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Empty */}
      {users.length === 0 && (
        <div className="p-10 text-center">
          <User size={48} className="text-slate-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white">No Users Found</h2>
        </div>
      )}

    </div>
  );
};

export default ViewAllUsers;