import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        alljobs: [],
    },
    reducers: {
        setAllJob: (state, action) => { // Corrected the name
            console.log(action.payload)
            state.alljobs = action.payload;

        }
    }
});

export const { setAllJob } = jobSlice.actions; // Corrected the export
export default jobSlice.reducer;
