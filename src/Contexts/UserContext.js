import React, { useState, createContext, useReducer } from 'react'
import {
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_RESET,
  USER_CREATE_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../Config/UserConstant'
import { api } from '../Services/api'

// Context
export const UserContext = createContext()

const UserContextProvider = (props) => {
  // state
  const initialState = {
    userInfo: [],
    info: false,
  }
  const [isAuthenticated, setisAuthenticated] = useState(false)
  const [userCreate, userCreateDispatch] = useReducer(
    createUserReducer,
    initialState
  )
  const [userLogin, userLoginDispatch] = useReducer(
    loginUserReducer,
    initialState
  )

  // function
  const createUser = async (dataPost, token) => {
    try {
      userCreateDispatch({ type: USER_CREATE_REQUEST })

      // Because we are sending data, we must add Content-Type
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }

      const { data } = await api.register(dataPost, config)
      // console.log(data);
      return data
    } catch (error) {
      console.log('error', error.response.data.detail)
      userCreateDispatch({
        type: USER_CREATE_FAIL,
        payload: error.response.data.detail,
      })
    }
  }

  const login = async (dataPost) => {
    try {
      userLoginDispatch({
        type: USER_LOGIN_REQUEST,
      })

      const { data } = await api.login(dataPost)

      setTimeout(() => {
        localStorage.setItem('token', JSON.stringify(data.token))
        localStorage.setItem('firstLogin', true)
        localStorage.setItem('id', JSON.stringify(data._id))
        userLoginDispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data,
        })
        setisAuthenticated(true)
      }, 3000)
    } catch (err) {
      console.log('err', err.response.data.detail)
      userLoginDispatch({
        type: USER_LOGIN_FAIL,
        payload: err.response.data.detail,
      })
    }
  }

  const logout = () => {
    userLoginDispatch({
      type: USER_LOGOUT,
    })
    setisAuthenticated(false)
    localStorage.clear()
    // api.logout()
  }

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        setisAuthenticated,
        userCreate,
        userCreateDispatch,
        createUser,
        userLogin,
        userLoginDispatch,
        login,
        logout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

const createUserReducer = (state, action) => {
  switch (action.type) {
    case USER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        info: false,
        userInfo: action.payload,
      }
    case USER_CREATE_SUCCESS:
      // console.log(state);
      return {
        ...state,
        info: true,
        loading: false,
        userInfo: action.payload,
      }
    case USER_CREATE_FAIL:
      return {
        ...state,
        info: 'error',
        loading: false,
        error: action.payload,
      }
    case USER_CREATE_RESET:
      return {
        ...state,
        info: false,
        userInfo: [],
        loading: false,
      }
    default:
      return state
  }
}

const loginUserReducer = (state, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export default UserContextProvider
