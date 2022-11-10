import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { response } from "express";


const initialState = []


export const handleToken = createAsyncThunk('email/handleToken', 
    async() =>{
        const response = await axios.post('/api/stripe', token)
        return response.data
    }    
)



const emailSlice = createSlice({
    name: 'email',
    initialState, 
    reducers: {

    }
})

export default emailSlice.reducer