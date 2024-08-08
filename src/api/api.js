/**
 * Fetches product categories from the FakeStore API.
 *
 * @async
 * @function getCategories
 * @returns {Promise<{response?: string[], error?: Error}>} A promise that resolves to an object containing either the categories response data or an error.
 * @throws {Error} Throws an error if the network request fails.
 */
export const getCategories = async () => {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    if (!response.ok) {
      throw new Error(
        "Data fetching failed, please check your network connection"
      );
    }
    const data = await response.json();
    return { response: data };
  } catch (error) {
    return { error: error };
  }
};

/**
 * This function fetches a single product from the FakeStore API by its ID.
 * 
 * @async
 * @function fetchSingleProduct
 * @param {number|string} id - The ID of the product to fetch.
 * @returns {Promise<{response?: Object, error?: Error}>} A promise that resolves to an object containing either the product data or an error.
 * @throws {Error} Throws an error if the network request fails.
 */
export const fetchSingleProduct = async (id) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
      throw new Error(
        "Data fetching failed :( , please check your network connection and reload."
      );
    }
    const data = await response.json();
    return { response: data };
  } catch (error) {
    return { error: error };
  }
};