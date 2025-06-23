import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUserApi } from "../../apis/authApis";

export const loginUser = createAsyncThunk(
    "auth/login",
    async ({email, password}, { rejectWithValue }) => {
        try {
            const loginUserResponse  = await loginUserApi(email, password);
            return loginUserResponse;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const initialState = {
    authToken: localStorage.getItem("authToken") || null,
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
                state.authToken = action.payload.token;
                localStorage.setItem('authToken', action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'fail';
                state.error = action.payload;
            });
    }
})

export const {logoutUser} = authSlice.actions;
export default authSlice.reducer;