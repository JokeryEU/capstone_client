import axios from 'axios'
import { ORDER_LIST_MY_ORDERS_RESET } from '../constants/orderConstants'
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/login`,
      { email, password },
      { withCredentials: true }
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    })
  }
}

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')

    dispatch({
      type: USER_LOGOUT,
    })

    await axios.post(
      `${process.env.REACT_APP_API_URL}/users/logout`,
      {},
      {
        withCredentials: true,
      }
    )

    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: USER_LIST_RESET })
    dispatch({ type: ORDER_LIST_MY_ORDERS_RESET })
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    })
  }
}

export const register =
  (firstName, lastName, email, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST })

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/register`,
        { firstName, lastName, email, password },
        { withCredentials: true }
      )

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      })

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      })

      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data
            ? error.response.data
            : error.message,
      })
    }
  }

export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST })

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/${id}`,
      { withCredentials: true }
    )

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    })
  }
}

export const updateUserProfile = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST })

    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/users/profile`,
      user,
      { withCredentials: true }
    )

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    })
  }
}

export const listUsers = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LIST_REQUEST })

    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/users`, {
      withCredentials: true,
    })

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    })
  }
}
