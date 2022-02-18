import React, { useState, createContext, useReducer } from 'react'
import {
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_RESET,
  USER_CREATE_SUCCESS,
} from '../Config/UserConstant'
import Header from '../Components/Header'
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
  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        setisAuthenticated,
        userCreate,
        userCreateDispatch,
        createUser,
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

export default UserContextProvider
