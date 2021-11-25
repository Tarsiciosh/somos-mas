import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import categoriesReducer from '../features/categories/CategoriesSlice';
import membersReducer from '../features/members/MembersSlice';
import slidesReducer from '../features/slides/SlidesSlice'
import activitiesReducer from '../features/activities/activitiesSlice'
import usReducer from '../features/us/UsSlice'
import userReducer from '../features/users/UserSlice';

import newsReducer from '../features/news/newsSlice'
import { authReducer } from './auth/authReducer';

export default configureStore({
  reducer: {
    counter: counterReducer,
    categories: categoriesReducer,
    slides: slidesReducer,
    activities: activitiesReducer,
    members: membersReducer,
    us: usReducer,
    users: userReducer,
    auth: authReducer,
    news: newsReducer,
  },
});
