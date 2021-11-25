import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMembers } from '../../services/miembros';
import {deleteOngApi} from '../../services/publicApiService';
import { MEMBERS } from '../../services/apiRest';

export const fetchAsync = createAsyncThunk(
  'members/fetchAsync',
  async (dispatch, thunkAPI) => {
    const response = await getMembers();
    console.log(response);
    return response.data;
  }
);

export const deleteMemberAsync = createAsyncThunk(
  'members/deleteAsync',
  async (id, dispatch, thunkAPI) => {
      await deleteOngApi(MEMBERS,id)
      alert(`Member ${id} deleted`);
  }
)

export const membersSlice = createSlice({
  name: 'members',
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

export default membersSlice.reducer;
