import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        alljobs: [],
        singleJob: null,
        AdminAllJob: [],
        SearchJobByText: "",
        allAppliedJob: [],
        searchTextQuerry: ""
    },
    reducers: {
        setAllJob: (state, action) => {

            state.alljobs = action.payload;

        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAdminJob: (state, action) => {
            console.log(action.payload)
            state.AdminAllJob = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.SearchJobByText = action.payload;
        },
        setAllAppliedJob: (state, action) => {
            state.allAppliedJob = action.payload
        },
        setSearchQuerry: (state, action) => {
            console.log(action.payload)
            state.searchTextQuerry = action.payload
        }

    }
});

export const { setAllJob, setSingleJob, setAdminJob, setSearchJobByText, setAllAppliedJob, setSearchQuerry } = jobSlice.actions; // Corrected the export
export default jobSlice.reducer;
