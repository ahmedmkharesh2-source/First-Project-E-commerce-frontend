import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {

    // نخزن بيانات المستخدم
    const [user, setUser] = useState(null);

    // loading حتى لا تعمل الصفحة قبل جلب البيانات
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // دالة جلب بيانات المستخدم
    const getUserProfile = async () => {

        try {

            // إرسال طلب لجلب بيانات المستخدم
            const response = await axios.get(
                "http://localhost:8000/api/v1/users/user-profile",
                {
                    withCredentials: true
                }
            );

            // تخزين بيانات المستخدم داخل state
            setUser(response.data.user);

        } catch (error) {

            console.log(error);

            // إذا لم يكن المستخدم مسجل دخول
            navigate("/login");

        } finally {

            // إيقاف اللودينق
            setLoading(false);

        }
    };

    // عند فتح الصفحة يتم جلب بيانات المستخدم
    useEffect(() => {

        getUserProfile();

    }, []);

    // أثناء التحميل
    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">
                    Loading...
                </h1>
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-4xl flex flex-col md:flex-row gap-8">

                {/* صورة المستخدم */}
                <div className="flex flex-col items-center justify-center md:w-1/3">

                    <img
                        src={
                            user?.profile?.url ||
                            "https://via.placeholder.com/150"
                        }
                        alt="Profile"
                        className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-md"
                    />

                    <h2 className="mt-4 text-xl font-semibold text-gray-700">
                        {user?.name}
                    </h2>

                </div>

                {/* بيانات المستخدم */}
                <div className="flex-1 space-y-4">

                    <div>

                        <p className="text-gray-500 text-sm">
                            Name
                        </p>

                        <h3 className="text-lg font-medium text-gray-800">
                            {user?.name}
                        </h3>

                    </div>

                    <div>

                        <p className="text-gray-500 text-sm">
                            Email
                        </p>

                        <h3 className="text-lg font-medium text-gray-800">
                            {user?.email}
                        </h3>

                    </div>

                    <div>

                        <p className="text-gray-500 text-sm">
                            Role
                        </p>

                        <h3 className="text-lg font-medium text-gray-800 capitalize">
                            {user?.role}
                        </h3>

                    </div>

                    {/* الأزرار */}
                    <div className="flex gap-4 pt-4">

                        <Link to="/update-profile">

                            <button className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow">

                                Update Profile

                            </button>

                        </Link>

                        <Link to="/update-password">

                            <button className="px-5 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg shadow">

                                Update Password

                            </button>

                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Profile;