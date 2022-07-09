import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import nyTimesApi from '../../api/nyTimes'

export const search = createAsyncThunk('appSearch/search', async (params, { rejectWithValue }) => {
    try {
        const response = await nyTimesApi.get(`/search/v2/articlesearch.json?q=${params.query}&page=${params.page}&api-key=${process.env.REACT_APP_NEW_YORK_TIMES_API_KEY}`);
        return response.data.response.docs
    }
    catch (err) {
        return rejectWithValue(err.message)
    }
})

export const addSearchHistory = createAsyncThunk('appSearch/addSearchHistory', async (params, { rejectWithValue }) => {
    return params
})

export const appSearchSlice = createSlice({
    name: 'appSearch',
    initialState: {
        data: [],
        searchHistory: [],
        loading: false,
        error: ''
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(search.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
            state.error = ''
        })
        builder.addCase(search.pending, (state, action) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(search.rejected, (state, action) => {
            state.error = action.payload
        })
        builder.addCase(addSearchHistory.fulfilled, (state, action) => {
            state.searchHistory = [...state.searchHistory, action.payload]
            if (state.searchHistory.length > 5) {
                state.searchHistory.shift()
            }
        })
    }
})

export default appSearchSlice.reducer
