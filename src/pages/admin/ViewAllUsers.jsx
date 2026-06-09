import axios from "axios";
import React, { useEffect, useState } from "react";


const ViewAllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/users/get-all-users",
          {
            withCredentials: true,
          }
        );

        console.log(response.data.users);

        setUsers(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };

    getAllUsers();
  }, []);

  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden">
      {/* HEADER */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-800">
          All Users
        </h1>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Profile</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Created At</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-500 bg-gray-800  transition"
              >
                <td className="px-6 py-4">
                  <img
                    src={
                      user.profileImage ||
                      "https://i.pravatar.cc/100"
                    }
                    alt="profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>

                <td className="px-6 py-4 font-medium">
                  {user.name}
                </td>

                <td className="px-6 py-4">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium
                    ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllUsers;