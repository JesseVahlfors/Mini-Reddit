import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from '../Articles/Articles/articleSlice'

export default configureStore({
  reducer: {
    articles: articlesReducer,
  }
})