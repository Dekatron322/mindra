// src/store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "./store"
import axios from "axios"
import { API_CONFIG } from "../config/api"

interface AuthState {
  token: string | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true
      state.error = null
    },
    loginSuccess(state, action: PayloadAction<string>) {
      state.token = action.payload
      state.loading = false
      state.error = null
      state.isAuthenticated = true
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
      state.isAuthenticated = false
    },
    logout(state) {
      state.token = null
      state.isAuthenticated = false
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions

// Thunk action for login
export const login = (username: string, password: string, rememberMe: boolean) => async (dispatch: AppDispatch) => {
  try {
    dispatch(loginStart())

    const response = await axios.post(`${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_ENDPOINT}`, {
      userName: username,
      password: password,
    })

    if (response.data.authenticate) {
      dispatch(loginSuccess(response.data.token))
      // Store token based on remember me choice
      if (rememberMe) {
        localStorage.setItem("authToken", response.data.token)
      } else {
        sessionStorage.setItem("authToken", response.data.token)
      }
    } else {
      dispatch(loginFailure(response.data.message || "Authentication failed"))
    }
  } catch (error: any) {
    dispatch(loginFailure(error.response?.data?.message || "Login failed"))
  }
}

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
