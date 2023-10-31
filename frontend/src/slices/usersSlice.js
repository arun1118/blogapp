import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL='/api/users';

const initialState = {
    users: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(`${USERS_URL}/allprofile`)
    return response.data
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        clearDataUser: (state,action)=>{
            state.users=[];
            state.status='idle';
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // console.log("users are : ",action.payload);
                const userData=action.payload.map((user)=>{
                    let filteredObj={};
                    for(const [key, value] of Object.entries(user)){
                        if(key!=='password') {filteredObj[key] = value;}
                      }
                      return filteredObj;
                })
                state.users = userData;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllUsers = (state) => state.users.users;
export const getUsersStatus = (state) => state.users.status;
export const getUsersError = (state) => state.users.error;

export const { clearDataUser } = usersSlice.actions

export default usersSlice.reducer