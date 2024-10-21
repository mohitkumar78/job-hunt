import { createSlice } from '@reduxjs/toolkit';

const companySlice = createSlice({
    name: "company",
    initialState: {  // Fix: changed to 'initialState' (capital S)
        singlecompany: null,
        Companies: [],
        searchText: ""
    },
    reducers: {
        setSingleCompany: (state, action) => {

            state.singlecompany = action.payload;
        },
        setAllCompany: (state, action) => {

            state.Companies = action.payload
        },
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        }

    }
});

export const { setSingleCompany, setAllCompany, setSearchText } = companySlice.actions;
export default companySlice.reducer;
