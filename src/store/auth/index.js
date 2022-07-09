import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import auth from '../../api/auth';


export const userLogin = createAsyncThunk('appUsers/userLogin', async (params, { rejectWithValue }) => {
  try {
    const response = await auth.post('/login', {
      email: params.email,
      password: params.password
    })
    window.localStorage.setItem('access_token', response.data.access_token)
    window.localStorage.setItem('user_email', params.email)
    window.localStorage.setItem('user_password', params.password)

    return response.data.access_token
  }
  catch (err) {
    return rejectWithValue(err.response.data.message)
  }
})


export const userSignup = createAsyncThunk('appUsers/userSignup', async (params, { rejectWithValue }) => {
  try {
    const response = await auth.post('/register', {
      email: params.email,
      password: params.password
    })
    window.localStorage.setItem('access_token', response.data.access_token)
    
    return response.data.access_token
  }
  catch (err) {
    return rejectWithValue(err.response.data.message)
  }
})

export const userLogout = createAsyncThunk('appUsers/userLogout', async (params, { rejectWithValue }) => {
  return window.localStorage.removeItem('access_token')
})


export const clearErrorMessage = createAsyncThunk('appUsers/clearErrorMessage', async (params, { rejectWithValue }) => {
  return
})


export const appAuthSlice = createSlice({
  name: 'appLogin',
  initialState: {
    token: '',
    error: ''
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.token = action.payload
      state.error = ""
    })
    builder.addCase(userLogin.rejected, (state, action) => {
      state.token = ""
      state.error = action.payload
    })
    builder.addCase(userSignup.fulfilled, (state, action) => {
      state.token = action.payload
      state.error = ""
    })
    builder.addCase(userSignup.rejected, (state, action) => {
      state.token = ""
      state.error = action.payload
    })
    builder.addCase(clearErrorMessage.fulfilled, (state, action) => {
      state.error = ""
    })
    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.token = ''
    })
  }
})

export default appAuthSlice.reducer
