import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CATEGORIES } from '../../services/apiRest';
import { getCategories } from '../../services/categories';

export const fetchAsync = createAsyncThunk(
    'categories/fetchAsync',
    async (dispatch, thunkAPI) => {
      const response = await getCategories()
      return response.data.data
    }
  )
export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    values: [],
    status: null
  },
  extraReducers: {
    [fetchAsync.pending]: (state, action)=>{
        state.status = 'loading'
    },
    [fetchAsync.fulfilled]: (state, action) => {
        state.status = 'success'
        state.values = action.payload
    },
    [fetchAsync.rejected]: (state, action) => {
        state.status = 'failed'
    }
  },
 
});

export default categoriesSlice.reducer;
