import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getActivities } from "../../services/activities"

const initialState = {
  fetched: [],
  status: 'idle'
}

export const getActivitiesInfo = createAsyncThunk(
    'actitivities/fetchActivities',
    async () => {
        const response = await getActivities()
        return response.data.data 
    }
)

export const activitiesSlice = createSlice ({
    name: 'activities',
    initialState,
    reducers: {
        //...
    },
    extraReducers: (builder) => {
        builder
            .addCase(getActivitiesInfo.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getActivitiesInfo.fulfilled, (state, action) => {
                state.status = 'succeded'
                state.fetched = action.payload
            })
            .addCase(getActivitiesInfo.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})


export default activitiesSlice.reducer 