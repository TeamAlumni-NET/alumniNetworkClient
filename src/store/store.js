
import { configureStore } from "@reduxjs/toolkit"
import authenticationReducer from "../reducers/authenticationSlice"
import groupListReducer from "../reducers/groupsSlice"
import topicListReducer from "../reducers/topicsSlice"

/**
 * Storage for reducers
 */
export default configureStore({
  reducer: {
    username: authenticationReducer,
    groupList: groupListReducer,
    topicList: topicListReducer
  }
})