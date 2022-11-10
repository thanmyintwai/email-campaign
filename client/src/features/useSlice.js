import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { response } from "express";


const initialState = []


export const fetchUser = createAsyncThunk('user/fetchUser', 
    async() =>{
        const response = await axios.get('/api/current_user')
        return response.data
    }    
)



const userSlice = createSlice({
    name: 'user',
    initialState, 
    reducers: {

    }
})

export default userSlice.reducer