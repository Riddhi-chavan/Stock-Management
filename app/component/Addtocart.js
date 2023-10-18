"use client"
import React from 'react'
import { useState } from 'react';

const Addtocart = ({ visible, onClose }) => {
  if (!visible) return null;

  const [alert, setalert] = useState("");
  const [productForm, setProductFrom] = useState({});


  const addProduct = async () => {

    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productForm),
      });

      if (response.ok) {
        console.log('Product added successfully');
        setalert("Your product is added ");
        setProductFrom({})
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product', error);
    }
  };

  const handlechange = (e) => {
    setProductFrom({ ...productForm, [e.target.name]: e.target.value })
  }
  return (
    <div className="container mx-auto pt-22 fixed inset-0  bg-opacity-30  backdrop-blur-sm z-50  pt-32">
      {alert && (
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
          {alert}
        </div>
      )}
      <div className="md:max-w-xl max-w-md mx-auto p-8 shadow-md rounded-md bg-gray-300 relative">
        <button onClick={onClose} className=' absolute top-0 mt-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none '>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h1 className="text-2xl font-semibold mb-4">Add a Product</h1>

        <div className="mb-4">
          <label htmlFor="productName" className="block text-sm font-medium text-gray-600">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={handlechange}
            name='slug'
            value={productForm?.slug || ""}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-600">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={handlechange}
            value={productForm?.quantity || ""}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-600">
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={handlechange}
            value={productForm?.price || ""}
          />
        </div>

        <button
          onClick={addProduct}
          className="bg-[#6366F1] text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Add Prouct
        </button>
      </div>
    </div>

  )
}

export default Addtocart
