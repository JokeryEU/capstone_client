import axios from 'axios'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_RATED_REQUEST,
  PRODUCT_TOP_RATED_SUCCESS,
  PRODUCT_TOP_RATED_FAIL,
} from '../constants/productConstants'

export const listProducts =
  (keyword = '', pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST })

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/products?keyword=${keyword}&pageNumber=${pageNumber}`
      )

      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data
            ? error.response.data
            : error.message,
      })
    }
  }

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/products/${id}`
    )

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    })
  }
}

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST })

    await axios.delete(`${process.env.REACT_APP_API_URL}/products/${id}`, {
      withCredentials: true,
    })

    dispatch({ type: PRODUCT_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    })
  }
}

export const createProduct = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST })

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/products`,
      {},
      {
        withCredentials: true,
      }
    )

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    })
  }
}

export const updateProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST })

    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/products/${product._id}`,
      product.body,
      {
        withCredentials: true,
      }
    )

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    })
  }
}
export const createProductReview = (productId, review) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })

    await axios.post(
      `${process.env.REACT_APP_API_URL}/products/${productId}/reviews`,
      review,
      {
        withCredentials: true,
      }
    )

    dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS })
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    })
  }
}

export const listTopRatedProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_RATED_REQUEST })

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/products/toprated`
    )

    dispatch({ type: PRODUCT_TOP_RATED_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_RATED_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    })
  }
}
