import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteSlide, getSlides } from '../../services/slides';

export const fetchAsync = createAsyncThunk(
    'slides/fetchAsync',
    async (dispatch, thunkAPI) => {
      const response = await getSlides()
      return response.data.data
    }
  )

  export const deleteSlideAsync = createAsyncThunk(
      'slides/deleteAsync',
      async (id, dispatch, thunkAPI) => {
          await deleteSlide(id)
          alert(`Slide ${id} deleted`) 
      }
  )
export const SlidesSlice = createSlice({
  name: 'slides',
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

export default SlidesSlice.reducer;
