import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modelData: [],
  companyData: [],
  locationData: [],
  districtData : [],
  stateData : [],
  loading: false,
};

export const ModelDataSlice = createSlice({
  name: "modelDataSlice",
  initialState: initialState,
  reducers: {
    setModelData: (state, action) => {
      state.modelData = action.payload;
    },
    setCompanyData: (state, action) => {
      state.companyData = action.payload;
    },
    setLocationData: (state, action) => {
      state.locationData = (action.payload)
    },
    setDistrictData : (state,action)=> {
      state.districtData = action.payload;
    },
    setStateData : (state,action)=> {
      state.stateData = action.payload;
    }
  },
});

export const { setModelData ,setCompanyData,setLocationData , setDistrictData, setStateData} = ModelDataSlice.actions;
export default ModelDataSlice.reducer;
