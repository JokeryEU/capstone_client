import axios from 'axios'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_ORDERS_REQUEST,
  ORDER_LIST_MY_ORDERS_SUCCESS,
  ORDER_LIST_MY_ORDERS_FAIL,
} from '../constants/orderConstants'

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST })

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/orders`,
      order,
      { withCredentials: true }
    )

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    })
  }
}

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST })

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/orders/${id}`,

      { withCredentials: true }
    )

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    })
  }
}

export const payOrder = (orderId, paymentResult) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST })

    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/orders/${orderId}/pay`,
      paymentResult,
      { withCredentials: true }
    )

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    })
  }
}

export const listMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_LIST_MY_ORDERS_REQUEST })

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/orders/myorders`,
      { withCredentials: true }
    )

    dispatch({
      type: ORDER_LIST_MY_ORDERS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_ORDERS_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    })
  }
}
