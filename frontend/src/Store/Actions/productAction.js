import axios from "axios";
import { GET_PRODUT_LIST, SELECT_PRODUCT, WISH_PRODUCT } from "./type";

export const selectProduct = (product_info) => {
  return {
    type: SELECT_PRODUCT,
    payload: product_info,
  };
};

export const wishProduct = async (body, id) => {
  const res = await axios.post(
    `${process.env.REACT_APP_SERVER}/api/mybag/${id}`,
    body
  );

  return {
    type: WISH_PRODUCT,
    payload: res.data,
  };
};

export const getProductList = async (mart, searchKeyword, page, sortFilter) => {
  console.log(mart, searchKeyword, page, sortFilter);
  let res = {};
  // 검색어가 없을 경우
  if (searchKeyword === "") {
    res = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/products/${mart}?page=${page}&sort=${sortFilter}`
    );
  }
  // 검색어가 있을 경우
  else {
    res = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/products/${mart}/${searchKeyword}?page=${page}&sort=${sortFilter}`
    );
  }

  return {
    type: GET_PRODUT_LIST,
    payload: res.data,
  };
};

export const changeMyBagState = async (productId) => {
  const res = await axios.patch(
    `${process.env.REACT_APP_SERVER}/api/mybag/changestat/${productId}`
  );

  return {
    type: GET_PRODUT_LIST,
    payload: res.data,
  };
};