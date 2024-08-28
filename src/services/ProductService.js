import axios from "axios";

const URL_PRODUCTS = "http://localhost:8080/products";

export const getAllProducts = async (name, categoryId) => {
  try {
    let url = `http://localhost:8080/products?_expand=category&_sort=name&_order=asc`;
    if (name) {
      url += `&name_like=${name}`;
    }
    if (categoryId) {
      url += `&categoryId=${categoryId}`;
    }
    let res = await axios.get(url);
    return res.data;
  } catch (e) {
    return [];
  }
};

export const saveProduct = async (product) => {
  try {
    await axios.post(URL_PRODUCTS, product);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
