import React, { useState } from "react";

const FilterForm = ({filterData, setFilters, onClose }) => {

  // Handle Input Change
  const handleChange = (e) => {
    setFilters({ ...filterData, [e.target.name]: e.target.value });
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg w-96 text-white">
        <h2 className="text-xl font-bold mb-4">Filter Items</h2>

        {/* Price Range */}
        <div className="mb-3">
          <label className="block text-gray-300">Price Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              name="priceMin"
              value={filterData.priceMin}
              onChange={handleChange}
              placeholder="Min"
              className="bg-gray-700 px-2 py-1 rounded w-full"
            />
            <input
              type="number"
              name="priceMax"
              value={filterData.priceMax}
              onChange={handleChange}
              placeholder="Max"
              className="bg-gray-700 px-2 py-1 rounded w-full"
            />
          </div>
        </div>

        {/* Location */}
        <div className="mb-3">
          <label className="block text-gray-300">Location</label>
          <input
            type="text"
            name="location"
            value={filterData.location}
            onChange={handleChange}
            placeholder="Enter location"
            className="bg-gray-700 px-2 py-1 rounded w-full"
          />
        </div>

        {/* Condition */}
        <div className="mb-3">
          <label className="block text-gray-300">Condition (1-5)</label>
          <input
            type="number"
            name="condition"
            value={filterData.condition}
            onChange={handleChange}
            min="1"
            max="5"
            className="bg-gray-700 px-2 py-1 rounded w-full"
          />
        </div>

        {/* Category */}
        <div className="mb-3">
          <label className="block text-gray-300">Category</label>
          <select name="category" value={filterData.category} onChange={handleChange} className="bg-gray-700 px-2 py-1 rounded w-full">
            <option value="">All</option>
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

        {/* Status */}
        <div className="mb-3">
          <label className="block text-gray-300">Status</label>
          <select name="status" value={filterData.status} onChange={handleChange} className="bg-gray-700 px-2 py-1 rounded w-full">
            <option value="">All</option>
            <option value="sale">Sale</option>
            <option value="trade">Trade</option>
            <option value="donation">Donation</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterForm;
