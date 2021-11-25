import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getNewsPublicApi } from '../../services/newsRequests' 

const initialState = {
  fetched: [],
  status: 'idle'
}

export const getNewsInfo = createAsyncThunk(
    'news/fetchNews',
    async () => {
        const response = await getNewsPublicApi()
        return response.data.data 
    }
)

export const newsSlice = createSlice ({
    name: 'slice',
    initialState,
    reducers: {
        //...
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNewsInfo.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getNewsInfo.fulfilled, (state, action) => {
                state.status = 'succeded'
                state.fetched = action.payload
            })
            .addCase(getNewsInfo.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})


export default newsSlice.reducer 