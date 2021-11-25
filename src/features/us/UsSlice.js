import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrganization } from '../../services/organizacion';


export const fetchAsync = createAsyncThunk(
    'us/fetchAsync',
    async (dispatch, thunkAPI) => {
      const response = await getOrganization();
      console.log(response);
      return response.data;
    }
  );


export const usSlice = createSlice({
    name: 'us',
    initialState: {
      values: [],
      status: null,
    },
    extraReducers: {
      [fetchAsync.pending]: (state, action) => {
        state.status = 'loading';
      },
      [fetchAsync.fulfilled]: (state, action) => {
        state.status = 'success';
        state.values = action.payload;
      },
      [fetchAsync.rejected]: (state, action) => {
        state.status = 'failed';
      },
    },
  });

  export default usSlice.reducer