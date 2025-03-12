// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//     isLoggedIn: false,
//     User: {},

// }

// export const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         setUser: (state, action) => {
//             const payload = action.payload
//             state.isLoggedIn = true
//             state.User = payload
//         },
//         removeUser: (state, action) => {
//             state.isLoggedIn = false
//             state.User = {}
//         }
//     },
// })


// export const { setUser, removeUser } = userSlice.actions
// export default userSlice.reducer


import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    user: {},
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const payload = action.payload
            state.isLoggedIn = true
            state.user = payload
        },
        removeUser: (state, action) => {
            state.isLoggedIn = false
            state.user = {}
        }
    },
})


export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer