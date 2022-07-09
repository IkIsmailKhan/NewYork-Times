// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import auth from './auth/index'
import topStories from './top-stories/index'
import search from './search/index';

export const store = configureStore({
    reducer: {
        auth,
        topStories,
        search
    }
})
