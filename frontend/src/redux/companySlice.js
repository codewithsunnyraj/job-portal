import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    companies: [],
  },
  reducers: {
    //actions
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompaines: (state, action) => {
      state.companies = action.payload;
    },
  },
});

export const { setSingleCompany,setCompaines } = companySlice.actions;
export default companySlice.reducer;
