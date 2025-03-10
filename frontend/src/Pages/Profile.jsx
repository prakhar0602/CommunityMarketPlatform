import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "../Redux/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backend_link = import.meta.env.VITE_BACKEND_LINK;

const Profile = () => {
  const user = useSelector((state) => state.User.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    location: user?.location || "",
    profile_picture: user?.profile_picture || "",
    id: user?._id || "",
  });

  if (!user) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function logout(){
    let response = await axios.get(`${backend_link}/logout`,{
      withCredentials:true
    })
    response = response.data;
    if(response.bool)
      navigate('/auth');
    else
      toast.warning("logout failed");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backend_link}/updateUser`, formData, {
        withCredentials: true,
      });
      if (response.data.bool) {
        setIsEditing(false);
        toast.success("Profile Updated Successfully!");
        dispatch(setUser(response.data.user));
      }
    } catch (error) {
      toast.error("Failed to update profile. Try again later.");
    }
  };

  return (
    <div className="bg-[#1E1B29] min-h-screen flex items-center gap-62 justify-start p-6 w-full ">
      <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-2xl w-fit max-w-3xl transition-all">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <img
            src={user.profile_picture || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-bold">{user.name}</h2>
            <p className="text-gray-300 text-sm">{user.email}</p>
            <p className="text-gray-400 text-sm">{user.location || "Unknown Location"}</p>
          </div>
        </div>
              <div className="flex gap-5">
        <button
          onClick={() => {setIsEditing(true);setIsViewing(false)}}
          className="mt-4 bg-blue-500 hover:bg-blue-800 transition-all text-white py-2 px-4 rounded-lg w-full"
          >
          Edit Profile
        </button>
        <button
          onClick={() => {setIsViewing(true);setIsEditing(false)}}
          className="mt-4 bg-green-500 hover:bg-green-800 transition-all text-white py-2 px-4 rounded-lg w-full"
          >
          View Profile
        </button>
          </div>
        <button
          onClick={() => logout()}
          className="mt-4 bg-red-500 hover:bg-red-800 transition-all text-white py-2 px-4 rounded-lg w-full"
          >
          Logout
        </button>
      </div>

      {isEditing && (
        <div className=" bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              />
              <input
                type="text"
                name="profile_picture"
                value={formData.profile_picture}
                onChange={handleChange}
                placeholder="Profile Picture URL"
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 transition-all text-white py-2 px-4 rounded-lg w-full mr-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-red-500 hover:bg-red-600 transition-all text-white py-2 px-4 rounded-lg w-full ml-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {
        isViewing?(
          <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-2xl w-fit max-w-3xl transition-all">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <img
              src={user.profile_picture || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-lg"
            />
            <div>
              <h2 className="text-3xl font-bold">{user.name}</h2>
              <p className="text-gray-300 text-sm">{user.email}</p>
              <p className="text-gray-400 text-sm">{user.location || "Unknown Location"}</p>
            </div>
          </div>
  
          <div className="mt-6 space-y-3">
            <div>
              <h3 className="text-lg font-semibold">Reputation:</h3>
              <p className="text-yellow-400 text-xl font-bold">{user.reputation}</p>
            </div>
  
            <div>
              <h3 className="text-lg font-semibold">Reviews:</h3>
              <div className="space-y-3 max-h-40 overflow-auto">
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
          </div>
                <div className="flex gap-5">
            </div>
        </div>
        ):(<></>)
      }
    </div>
  );
};

export default Profile;
