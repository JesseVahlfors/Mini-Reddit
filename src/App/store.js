import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from '../Articles/Articles/articlesSlice'
import commentsReducer from '../Articles/Comments/commentsSlice'

export default configureStore({
  reducer: {
    articles: articlesReducer,
    comments: commentsReducer,
  }
})