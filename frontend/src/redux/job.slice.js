import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        alljobs: [],
        singleJob: null
    },
    reducers: {
        setAllJob: (state, action) => { // Corrected the name
            console.log(action.payload)
            state.alljobs = action.payload;

        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        }
    }
});

export const { setAllJob, setSingleJob } = jobSlice.actions; // Corrected the export
export default jobSlice.reducer;
