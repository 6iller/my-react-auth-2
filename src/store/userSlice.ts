import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    "id": 1,
    "firstName": "Emily",
    "lastName": "Johnson",
    "maidenName": "Smith",
    "age": 28,
    "gender":"female",
    "email": "emily.jonhson@x.dummyjson.com",
}

export const userSlice = createSlice ({
    name: "user",
    initialState,
    reducers: {
        changeName: (state, action) => {
            state.firstName = action.payload
        }
    }

})

export const {changeName} = userSlice.actions

export default userSlice.reducer