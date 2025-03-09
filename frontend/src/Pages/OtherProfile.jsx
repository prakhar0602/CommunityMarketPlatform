import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const backend_link = import.meta.env.VITE_BACKEND_LINK
const OtherProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${backend_link}/getUser?id=${id}`);
        console.log(response.data)
        setUser(response.data.User);
      } catch (error) {
        console.error("Error fetching user profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [id]);

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  if (!user) {
    return <div className="text-white text-center mt-10">User not found</div>;
  }

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
      </div>
    </div>
  );
};

export default OtherProfile;
