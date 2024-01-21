import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from '../Articles/Articles/articlesSlice'

export default configureStore({
  reducer: {
    articles: articlesReducer,
  }
})