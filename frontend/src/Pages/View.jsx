import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const backend_link = import.meta.env.VITE_BACKEND_LINK;

const View = () => {
  const { id } = useParams(); // Get item ID from URL
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const buyer = useSelector((state)=>state.User.user);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        let response = await axios.get(`${backend_link}/getItem/${id}`); // Fetch item details from backend
        response = response.data;
        if (response.bool) {
          setItem(response.item);
        } else {
          toast.error("Invalid Item");
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleBuyNow = async () => {
    try {
      let seller = item.seller
      // Example request: This should be modified based on actual backend requirements
      const response = await axios.post(`${backend_link}/buy`, { item: id,seller, buyer});
      
      if (response.data.bool) {
        toast.success("Purchase successful! 🎉");
      } else {
        toast.error("Purchase failed. Please try again.");
      }
    } catch (error) {
      toast.error("Error processing purchase.");
      console.error("Buy Now Error:", error);
    }
  };

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  if (!item) {
    return <div className="text-red-400 text-center mt-10">Item not found.</div>;
  }

  return (
    <div className="bg-[#2C2638] min-h-screen p-6 flex justify-center items-center">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
        {/* Item Images (Carousel-like effect if multiple images) */}
        <div className="flex overflow-x-auto space-x-4">
          {item.Images.length > 0 ? (
            item.Images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Item Image ${index + 1}`}
                className="w-32 h-32 object-cover rounded-lg"
              />
            ))
          ) : (
            <img
              src="https://via.placeholder.com/150"
              alt="Placeholder"
              className="w-32 h-32 object-cover rounded-lg"
            />
          )}
        </div>

        {/* Item Details */}
        <h2 className="text-2xl font-bold mt-4">{item.itemName}</h2>
        <p className="text-gray-300 mt-2">{item.description || "No description available."}</p>

        {/* Seller & Price */}
        <p className="text-gray-400 mt-3">Seller: {<Link to={`/profile/${item.seller._id}`}>{item.seller?.name || "Unknown"}</Link>}</p>
        <p className="text-green-400 text-xl font-bold mt-1">${item.price}</p>

        {/* Condition & Category */}
        <div className="mt-3">
          <p className="text-gray-300">
            <span className="font-semibold">Category:</span> {item.category}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">Condition:</span> {item.condition}/5
          </p>
        </div>

        {/* Status (Sale, Trade, Donation) */}
        <p
          className={`mt-3 inline-block px-3 py-1 rounded-lg text-sm ${
            item.status === "sale"
              ? "bg-green-500"
              : item.status === "trade"
              ? "bg-yellow-500"
              : "bg-blue-500"
          }`}
        >
          {item.status.toUpperCase()}
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex space-x-4">
          {/* Buy Now Button */}
            {item.seller._id!=buyer._id && item.status!="sold"?(<button
              onClick={handleBuyNow}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white flex-1"
            >
              Buy Now
            </button>):(<></>)}

          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-md text-white flex-1"
          >
            Go Back
          </button>
          {
            item.status=="sold" && item.buyer==buyer._id?(
              <button
            onClick={() => window.history.back()}
            className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-md text-white flex-1"
          >
            Give Review
          </button>
            ):(<></>)
          }
        </div>
      </div>
    </div>
  );
};

export default View;
