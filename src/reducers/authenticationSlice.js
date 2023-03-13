import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import keycloak from "../keycloak"

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    username: ""
  },
  reducers: {
    logout: (state, action) => {
      //keycloak.logout()
      state.username = "",
      localStorage.clear()
    },
    login: (state, action) => {
      state.username = action.payload
    }
  }
})

export const {logout, login} = authenticationSlice.actions
export default authenticationSlice.reducer