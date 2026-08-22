import { createSlice } from "@reduxjs/toolkit"


const initialState  =  {
    selectedState : null,
    districtsOfState : null,
    selectedDistrict : null,
    locationsOfDistrict : null,
    wholeData : null,
    availableCars : null,
}

const selectRideSlice = createSlice({
    name:'selectRideSlice',
    initialState,
    reducers:{
        setSelectedState : (state,action) => {
            state.selectedState = action.payload
        },
        setDistrictsOfState : (state,action) => {
            state.districtsOfState = action.payload
        },
        setSelectedDistrict : (state,action) => {
            state.selectedDistrict = action.payload
        },
        setLocationsOfDistrict : (state,action) => {
            state.locationsOfDistrict = action.payload

        },
        setWholeData : (state, action ) => {
            state.wholeData = action.payload

        },
        setAvailableCars:(state,action) => {
            state.availableCars = action.payload
        }
    },
})

export const {setSelectedState ,setDistrictsOfState, setSelectedDistrict ,setLocationsOfDistrict, setWholeData , setAvailableCars} = selectRideSlice.actions
export default  selectRideSlice.reducer