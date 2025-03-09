import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "../Redux/userSlice";
import axios from "axios";
const backend_link = import.meta.env.VITE_BACKEND_LINK
const Profile = () => {
  const user = useSelector((state) => state.User.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    location: user?.location || "",
    profile_picture: user?.profile_picture || "",
    id:useSelector((state)=>state.User.user._id)
  });

  if (!user) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Dispatch action to update user profile
   let response = await axios.post(`${backend_link}/updateUser`,formData,{
    withCredentials:true
   })
   response = response.data;
   console.log(response);
   if(response.bool){
       setIsEditing(false);
       toast.success("Profile Updated");
       dispatch(setUser(response.user));
    }
  };

  return (
    <div className="bg-[#2C2638] min-h-screen flex items-center justify-center p-6">
      <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-xl w-full max-w-3xl">
        {/* Profile Header */}
        <div className="flex items-center gap-6">
          <img
            src={user.profile_picture || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-purple-500"
          />
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-300">{user.email}</p>
            <p className="text-gray-400">{user.location || "Unknown Location"}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold">Reputation:</h3>
          <p className="text-yellow-400 text-xl font-bold">{user.reputation}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold">Reviews:</h3>
          <div className="space-y-3">
            {user.reviews.length > 0 ? (
              user.reviews.map((review, index) => (
                <div key={index} className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-300">{review.review}</p>
                  <p className="text-sm text-gray-400 mt-1">From: {review.from.name}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No reviews yet.</p>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Edit Profile
        </button>

        {/* Edit Profile Form */}
        {isEditing && (
          <form onSubmit={handleSubmit} className="mt-6 bg-gray-700 p-4 rounded-lg">
            <div className="mb-2">
              <label className="block text-gray-300">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-600 text-white"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-300">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-600 text-white"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-300">Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-600 text-white"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-300">Profile Picture URL:</label>
              <input
                type="text"
                name="profile_picture"
                value={formData.profile_picture}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-600 text-white"
              />
            </div>
            <button
              type="submit"
              className="mt-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="ml-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
