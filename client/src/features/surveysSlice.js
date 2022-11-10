import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { response } from "express";


const initialState = []


export const fetchSurveys = createAsyncThunk('surveys/fetchSurveys', 
    async() =>{
        const response = await axios.get('/api/surveys')
        return response.data
    }    
)



export const submitSurvey = createAsyncThunk('surveys/submitSurvey',
    async (values, history) =>{
        const response = await axios.post('/api/surveys', values);
        history.push('/surveys')
        return response.data
        
    }
)

const surveysSlice = createSlice({
    name: 'surveys',
    initialState, 
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchSurveys.fulfilled, (state, action)=>{
                return action.payload
            })
    }
})




export default surveysSlice.reducer

export const selectAllSurveys = (state) => state.surveys
