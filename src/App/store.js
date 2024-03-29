import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from '../Articles/Articles/articlesSlice'
import commentsReducer from '../Articles/Comments/commentsSlice'
import subredditListReducer from '../Sidebar/SubredditList/subredditListSlice'
import subredditReducer from '../Sidebar/Subreddit/subredditSlice'
import mediaPlayerReducer from '../Utils/VideoComponents/mediaPlayerSlice'

export default configureStore({
  reducer: {
    articles: articlesReducer,
    comments: commentsReducer,
    subreddits: subredditListReducer,
    subreddit: subredditReducer,
    mediaPlayer: mediaPlayerReducer, 
  }
}) 