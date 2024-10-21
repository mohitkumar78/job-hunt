import { createSlice } from "@reduxjs/toolkit";

const ApplicantsSlice = createSlice({
    name: "applicants",
    initialState: {
        applicants: []
    },
    reducers: {
        setApplicants: (state, action) => {
            console.log(action.payload)
            state.applicants = action.payload
        }
    }

})
export const { setApplicants } = ApplicantsSlice.actions;
export default ApplicantsSlice.reducer;