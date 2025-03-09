import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AddItemForm from "../Components/AddItemForm";

const backend_link = import.meta.env.VITE_BACKEND_LINK;

const Dashboard = () => {
  const userId = useSelector((state) => state.User.user?._id);
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch User Items
  const fetchUserItems = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`${backend_link}/getUserItem/${userId}`);
      if (data.bool) {
        setItems(data.items);
      } else {
        toast.error("Failed to fetch your items.");
      }
    } catch (error) {
      console.error("Error fetching user items:", error);
      toast.error("An error occurred while fetching items.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserItems();
  }, [fetchUserItems]);

  return (
    <div className="bg-[#2C2638] min-h-screen p-6 text-white">
      <h2 className="text-3xl font-bold text-center mb-6">Your Items</h2>

      <div className="text-center mb-4">
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md"
        >
          + Add Item
        </button>
      </div>

      {showForm && <AddItemForm onClose={() => setShowForm(false)} refreshItems={fetchUserItems} />}

      <div className="max-w-6xl mx-auto">
        {loading ? (
          <p className="text-gray-400 text-center mt-4">Loading your items...</p>
        ) : items.length > 0 ? (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {items.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center mt-4">No items added yet.</p>
        )}
      </div>
    </div>
  );
};

const ItemCard = ({ item }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-white">
      <img
        src={item.Images?.length > 0 ? item.Images[0] : "https://via.placeholder.com/150"}
        alt={item.itemName}
        className="w-full h-40 object-cover rounded-md"
      />
      <div className="mt-3">
        <h3 className="text-xl font-semibold">{item.itemName}</h3>
        <p className="text-gray-400 text-sm">Condition: {item.condition}/5</p>
        <p className="text-green-400 font-bold mt-1">Rs.{item.price}</p>
        <Link
          to={`/view/${item._id}`}
          className="mt-3 block bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-md text-white text-center"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
