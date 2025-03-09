import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const backend_link = import.meta.env.VITE_BACKEND_LINK;

const AddItemForm = ({ onClose }) => {
  const [itemData, setItemData] = useState({
    itemName: "",
    description: "",
    price: "",
    condition: "",
    category: "",
    status: "",
    images: [],
    id:useSelector((state)=>state.User.user._id)
  });
  
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };

  const handleAddImage = () => {
    if (imageUrl.trim() !== "") {
      setItemData({ ...itemData, images: [...itemData.images, imageUrl] });
      setImageUrl("");
    }
  };

  const handleRemoveImage = (index) => {
    setItemData({
      ...itemData,
      images: itemData.images.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log(itemData);
      let response = await axios.post(`${backend_link}/addItem`, itemData, {
        withCredentials:true
      });

      response = response.data;

      if (response.bool) {
        toast.success("Item added successfully!");
        onClose();
      } else {
        toast.error("Failed to add item.");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg w-96 text-white">
        <h2 className="text-xl font-bold mb-4">Add New Item</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-gray-300">Item Name</label>
            <input type="text" name="itemName" value={itemData.itemName} onChange={handleChange} className="bg-gray-700 px-2 py-1 rounded w-full" required />
          </div>

          <div className="mb-3">
            <label className="block text-gray-300">Description</label>
            <textarea name="description" value={itemData.description} onChange={handleChange} className="bg-gray-700 px-2 py-1 rounded w-full" required />
          </div>

          <div className="flex gap-5 mb-3">
            <div className="w-1/2">
              <label className="block text-gray-300">Price</label>
              <input type="number" name="price" value={itemData.price} onChange={handleChange} className="bg-gray-700 px-2 py-1 rounded w-full" required />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-300">Condition (1-5)</label>
              <input type="number" name="condition" value={itemData.condition} onChange={handleChange} min="1" max="5" className="bg-gray-700 px-2 py-1 rounded w-full" required />
            </div>
          </div>

          <div className="flex gap-5 mb-3">
            <div className="w-1/2">
              <label className="block text-gray-300">Category</label>
              <select name="category" value={itemData.category} onChange={handleChange} className="bg-gray-700 px-2 py-1 rounded w-full" required>
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Furniture">Furniture</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Accessories">Accessories</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-gray-300">Status</label>
              <select name="status" value={itemData.status} onChange={handleChange} className="bg-gray-700 px-2 py-1 rounded w-full" required>
                <option value="">Select Status</option>
                <option value="sale">Sale</option>
                <option value="trade">Trade</option>
                <option value="donation">Donation</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-gray-300">Images</label>
            <div className="flex gap-2">
              <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="bg-gray-700 px-2 py-1 rounded w-full" />
              <button type="button" onClick={handleAddImage} className="bg-blue-500 px-2 py-1 rounded">+</button>
            </div>
            <div className="mt-2">
              {itemData.images.map((img, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-700 p-2 rounded mt-1">
                  <span className="truncate w-3/4">{img}</span>
                  <button type="button" onClick={() => handleRemoveImage(index)} className="text-red-500">Remove</button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button type="submit" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md">Add Item</button>
            <button type="button" onClick={onClose} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemForm;
