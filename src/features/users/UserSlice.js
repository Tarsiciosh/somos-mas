import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CATEGORIES } from '../../services/apiRest';
import { getUsers } from '../../services/usuarios';

export const fetchAsync = createAsyncThunk(
    'users/fetchAsync',
    async (dispatch, thunkAPI) => {
      const response = await getUsers()
      return response.data.data
    }
  )
export const UserSlice = createSlice({
  name: 'users',
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

export default UserSlice.reducer;
