import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUserApi } from "../../apis/authApis";

export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        console.log(credentials, "login creds")
        const { email, password} =  credentials
        try {
            const token  = await loginUserApi(email,password);
            console.log(token, "auth token bla")

          
            return await token;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const initialState = {
    authToken: localStorage.getItem("authToken"),
    status: "idle",
    error: null
}


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutUser(state) {
            state.authToken = null;
            localStorage.removeItem("authToken");
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginUser.pending, state => { state.status = 'loading'; })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'success';
                state.authToken = action.payload;
                console.log('actim paylaod',action.payload)
                  localStorage.setItem('authToken', action.payload);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'fail';
                state.error = action.payload;
            });
    }
})

export const {logoutUser} = authSlice.actions;
export default authSlice.reducer;