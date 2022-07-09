import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import nyTimesApi from '../../api/nyTimes'


export const fetchTopStories = createAsyncThunk('appTopStories/fetchTopStories', async (params, { rejectWithValue }) => {
  try {
    const response = await nyTimesApi.get(`/topstories/v2/${params}.json?api-key=${process.env.REACT_APP_NEW_YORK_TIMES_API_KEY}`    );

    var filteredData = response.data.results.filter(item => {
      return item.title !== ''
    })

    return filteredData
  }
  catch (err) {
    return rejectWithValue(err.message)
  }
})

export const clearStories = createAsyncThunk('appTopStories/clearStories', async (params, { rejectWithValue }) => {
  return
})


export const appTopStoriesSlice = createSlice({
  name: 'appTopStories',
  initialState: {
    data: [],
    loading: false,
    error: ''
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTopStories.fulfilled, (state, action) => {
      state.data = action.payload
      state.loading = false
      state.error = ''
    })
    builder.addCase(fetchTopStories.pending, (state, action) => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetchTopStories.rejected, (state, action) => {
      state.error = action.payload
    })
    builder.addCase(clearStories.fulfilled, (state, action) => {
      state.data = []
    })
  }
})

export default appTopStoriesSlice.reducer
