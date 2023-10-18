"use client";
import { useState, useEffect, useRef } from 'react';


export default function Home() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);


  const [products, setProducts] = useState([]);

  const [query, setquery] = useState("");
  const [loading, setloading] = useState(false)
  const [dropdown, setDropdown] = useState([]);
  const inputRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [edit, setEdit] = useState(false);
  const [loadingAction, setleadingAction] = useState(false)

   // Assume handleAction function looks like this
const handleAction = async (action, slug) => {
  try {
    const response = await fetch("/api/action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action, slug }),
    });

    if (!response.ok) {
      // Handle non-successful responses
      console.error(`Failed to perform action. Status: ${response.status}`);
      return;
    }

    const result = await response.json();

    // Check if the response is an object
    if (result && typeof result === "object") {
      // Optionally handle the result object
      console.log(result);
    } else {
      console.error("Unexpected response format:", result);
    }
  } catch (error) {
    console.error("Error performing action:", error);
  }
};


  const showDropdown = () => {
    setDropdownVisible(true);
  };

  const hideDropdown = () => {
    setDropdownVisible(false);
    inputRef.current.value = '';
    setDropdown([]);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/product');

      if (!response.ok) {
        // Handle non-successful responses (e.g., 404 Not Found, 500 Internal Server Error)
        console.error(`Failed to fetch products. Status: ${response.status}`);
        return;
      }

      const rjson = await response.json();

      // Check if the response contains the expected property (e.g., 'products')
      if (rjson && rjson.products) {
        setProducts(rjson.products);
      } else {
        console.error('Unexpected response format:', rjson);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const OndropdownEdit = async (e) => {
    const searchQuery = e.target.value.trim(); // Trim whitespace
    setquery(searchQuery); // Update the state for consistency

    if (!loading && searchQuery !== '') {
      setloading(true);
      try {
        const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
        if (response.ok) {
          const rjson = await response.json();
          setDropdown(rjson.products);
        } else {
          console.error('Failed to fetch search results');
        }
      } catch (error) {
        console.error('Error fetching search results', error);
      } finally {
        setloading(false);
      }
    } else {
      setDropdown([]); // Clear the dropdown if the search query is empty
    }
  };

  const handleSelect = (selectedItem) => {
    console.log("Select button clicked:", selectedItem);
    setSelectedProduct(selectedItem);
    hideDropdown();
  };

  const resetSelectedProduct = () => {
    setSelectedProduct(null);
  };

  const editproducts = () => {
    setEdit(true);
  }
  const handleQuantityChange = (id, newQuantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((item) =>

        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const buttonAciton = async (action, slug, initialquantity) => {
    console.log("Action:", action);
    console.log("Slug:", slug);
    setleadingAction(true);
    const response = await fetch('/api/action', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, slug, initialquantity }),
    })
    // let r = await response.json()
    console.log(response);
    setleadingAction(false);
  }

  return (
    <>


      <div className="container  mt-8">
        <div>
          <div className="relative md:ml-12 mx-2">
            <div className={` p-4 rounded-full shadow-xl flex items-center w-full md:w-2/6 h-10 border-black border-x-2 border-y-2 relative ${isDropdownVisible ? 'border-blue-500 bg-white' : ''}`}>
              <svg className="h-2 w-5 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M14.742 13.32a8.5 8.5 0 1 0-1.415 1.415l4.942 4.941a1 1 0 0 0 1.415-1.415l-4.942-4.941zM16 8.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                className="outline-none focus:outline-none  flex-1"
                id="searchInput"
                onFocus={showDropdown}
                onChange={OndropdownEdit}
                ref={inputRef}
              />
              {loading &&
                <div className='mr-5'>
                  <svg width="28" height="28" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="40" stroke="#3498db" strokeWidth="4" strokeLinecap="round" fill="none">
                      <animate attributeName="stroke-dasharray" values="0 250; 250 0; 0 250" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="stroke-dashoffset" values="0 -250; -250 -500; -500 -750" dur="2s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                </div>

              }
              {isDropdownVisible && (
                <svg
                  className="h-4 w-4 text-gray-400 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  onClick={hideDropdown}
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM10 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm1.414 3.586a1 1 0 1 1 1.414 1.414L11.414 10l1.414 1.414a1 1 0 0 1-1.414 1.414L10 11.414l-1.414 1.414a1 1 0 1 1-1.414-1.414L8.586 10 7.172 8.586a1 1 0 0 1 1.414-1.414L10 8.586l1.414-1.414z"
                  />
                </svg>
              )}
            </div>

            <div className={`absolute mt-2 p-2 rounded shadow-md w-2/6 ${dropdown.length > 0 && isDropdownVisible ? 'bg-white' : 'opacity-0 invisible'}`}>
              {dropdown.length > 0 && (
                dropdown.map((item) => (
                  <div className="flex justify-between items-center py-1 border-b " key={item.slug}>
                    <span>{item.slug}</span>
                    <button onClick={() => handleSelect(item)} className="text-blue-500">
                      Select
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className={`container mx-auto mt-8 ${dropdown.length > 0 && isDropdownVisible ? ' mt-32' : ''}`}>
              <h1 className={`text-2xl font-semibold mb-4 text-center bg-[#6366F1] text-white p-4 max-w- rounded-md mt-10  h-16 w-full ${!selectedProduct ? 'mb-4' : ''} ${dropdown.length > 0 && isDropdownVisible ? ' mt-32' : ''} `} >Display Current Stock
              </h1>
              <div className='flex'>
                {selectedProduct && (
                  <button onClick={resetSelectedProduct} className="text-blue-500 mt-28  pb-4 absolute top-12 right-2  ">
                    <a href="#_" className="relative inline-flex items-center justify-center p-2 px-6 py-1 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group w-60">
                      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </span>
                      <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">Show All Products</span>
                      <span className="relative invisible">Button Text</span>
                    </a>
                  </button>
                )}

                <div className={`w-full  bg-white  border ${selectedProduct ? 'mt-12' : ''}  border-collapse border-gray-500 rounded-md overflow-hidden mb-24 shadow-lg relative overflow-x-auto  sm:rounded-lg  my-5`}>
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                    <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                      Our products
                      <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of Flowbite products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more.</p>
                    </caption>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Product name
                        </th>

                        <th scope="col" className="px-6 py-3">
                          Quantity
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {!selectedProduct &&
                        products?.map((item) => {
                          return (
                            <tr className="bg-white dark:bg-gray-800" key={item.id}>
                              <td className="px-6 py-4">{item.slug}</td>
                              <td className="px-6 py-4">
                                {edit ? (

                                  <div className="flex items-center space-x-3 ">
                                    <button onClick={() => { buttonAciton("minus", item.slug, item.quantity) }} disabled={loadingAction} className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 disabled:bg-[#dedcce]" type="button">
                                      <span className="sr-only">Quantity button</span>
                                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                      </svg>
                                    </button>
                                    <div>
                                      <input
                                        type="number"
                                        id={`quantity_${item.id}`}
                                        value={item.quantity}

                                        className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="1"
                                        required
                                      />
                                    </div>
                                    <button onClick={() => { buttonAciton("plus", item.slug, item.quantity) }} disabled={loadingAction} className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 disabled:bg-[#dedcce] " type="button">
                                      <span className="sr-only">Quantity button</span>
                                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                      </svg>
                                    </button>
                                  </div>
                                ) : (
                                  item.quantity
                                )}
                              </td>
                              <td className="px-6 py-4">{item.price}</td>
                              {edit && (
                                <td className="px-6 py-4 text-right">
                                  <a
                                    href="#"
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    onClick={() => handleAction("delete", item.slug)}
                                  >
                                    Delete
                                  </a>
                                </td>
                              )}
                              <td className="px-6 py-4 text-right" onClick={() => editproducts()}>
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                  Edit
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      {selectedProduct && (
                        <tr className="bg-white dark:bg-gray-800" key={selectedProduct.id}>
                          <td className="px-6 py-4">{selectedProduct.slug}</td>
                          <td className="px-6 py-4">
                            {edit ? (
                              <div className="flex items-center space-x-3 ">
                                <button onClick={() => { buttonAciton("minus", selectedProduct.slug, selectedProduct.quantity) }} disabled={loadingAction} className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 disabled:bg-[#dedcce]" type="button">
                                  <span className="sr-only">Quantity button</span>
                                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                  </svg>
                                </button>
                                <div>
                                  <input
                                    type="number"
                                    id={`quantity_${selectedProduct.id}`}
                                    value={selectedProduct.quantity}
                                    onChange={(e) => handleQuantityChange(selectedProduct.id, parseInt(e.target.value))}
                                    className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="1"
                                    required
                                  />
                                </div>
                                <button onClick={() => { buttonAciton("plus", selectedProduct.slug, selectedProduct.quantity) }} disabled={loadingAction} className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 disabled:bg-[#dedcce]" type="button">
                                  <span className="sr-only">Quantity button</span>
                                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                  </svg>
                                </button>
                              </div>
                            ) : (
                              selectedProduct.quantity
                            )}
                          </td>
                          <td className="px-6 py-4">{selectedProduct.price}</td>
                          <td className="px-6 py-4 text-right">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={editproducts}>
                              Edit
                            </a>
                          </td>
                        </tr>
                      )}

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div >
    </>
  )
}
