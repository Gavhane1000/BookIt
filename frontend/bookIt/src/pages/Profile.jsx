import React from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

const Profile = () => {
  const profileStr = localStorage.getItem("profile");
  const profile = profileStr ? JSON.parse(profileStr) : null;

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="flex-1 flex items-center justify-center p-6">
          {profile ? (
            <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl p-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Profile Avatar"
                  className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md object-cover"
                />
                <h2 className="mt-4 text-3xl font-bold text-gray-800">
                  {profile.username}
                </h2>
                <p className="text-gray-500">{profile.email}</p>
              </div>

              {/* Details Section */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <ProfileInfo
                  label="Role"
                  value={profile.is_superuser ? "Superuser" : "User"}
                />
                <ProfileInfo label="Staff" value={profile.is_staff ? "Yes" : "No"} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              {/* Empty state image */}
              <img
                src="https://cdn-icons-png.flaticon.com/512/748/748097.png"
                alt="No Profile"
                className="w-32 h-32 mb-4 opacity-80"
              />
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                No Profile Found
              </h2>
              <p className="text-gray-500">Please log in to view your profile.</p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

// Info row component
const ProfileInfo = ({ label, value }) => (
  <div className="flex justify-between p-4 bg-gray-50 rounded-xl shadow-sm">
    <span className="font-medium text-gray-600">{label}</span>
    <span className="text-gray-800">{value}</span>
  </div>
);

export default Profile;
