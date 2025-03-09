import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import FilterForm from "../Components/FilterForm"; // Importing Filter Component

const backend_link = import.meta.env.VITE_BACKEND_LINK;

const Browse = () => {
  const [items, setItems] = useState([]);
  const [showFilter, setShowFilter] = useState(false); // State for filter modal
  const [filters, setFilters] = useState({
    priceMin: "",
    priceMax: "",
    location: "",
    condition: "",
    category: "",
    status: "",
  }); // Store selected filters
  

  useEffect(() => {
    fetchItems(filters);
  }, [filters]);

  // Fetch Items (With Filters)
  const fetchItems = async (filters = {}) => {
    try {
      let queryParams = new URLSearchParams(filters).toString();
      let response = await axios.get(`${backend_link}/filter?${queryParams}`);
      response = response.data;

      if (response.bool) setItems(response.items);
      else toast.error("Items not fetched.");
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  return (
    <div className="bg-[#2C2638] min-h-screen p-6">
      <h2 className="text-white text-3xl font-bold text-center mb-6">Items for Sale</h2>

      {/* Filter Button */}
      <div className="text-center mb-4">
        <button
          onClick={() => setShowFilter(true)}
          className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-md text-white"
        >
          Filter Items
        </button>
      </div>

      {/* Filter Form Modal */}
      {showFilter && <FilterForm filterData={filters} setFilters={setFilters} onClose={() => setShowFilter(false)} />}

      {/* Items List */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item._id} className="bg-gray-800 p-4 rounded-lg shadow-lg text-white">
              <img
                src={item.Images.length > 0 ? item.Images[0] : "https://via.placeholder.com/150"}
                alt={item.itemName}
                className="w-full h-64 object-cover rounded-md"
              />

              <div className="mt-3">
                <h3 className="text-xl font-semibold">{item.itemName}</h3>
                <p className="text-gray-400 text-sm">Seller: {item.seller?.name || "Unknown"}</p>
                <p className="text-green-400 font-bold mt-1">Rs.{item.price}</p>

                <Link
                  to={`/view/${item._id}`}
                  className="mt-3 bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-md text-white w-full block text-center"
                >
                  View
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-3">No items available.</p>
        )}
      </div>
    </div>
  );
};

export default Browse;
