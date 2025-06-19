import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPromptResponseApi, sendEmailsApi } from "../../apis/promptApis";

const initialState = {
    loading: false,
    promptResponse: null,
    error: null,
    selectedVendors: [],
    sending: false,
    sendEmailsResponse: null,
    sendError: null,
};

export const getPromptResponse = createAsyncThunk(
  "prompt/getPromptResponse",
  //   async (promptResponsePayload, authToken, { rejectWithValue }) => {
  async (promptResponsePayload, { rejectWithValue }) => {
    try {
      //   const promptResponse = await getPromptResponseApi(
      //     promptResponsePayload,
      //     authToken
      //   );
      const promptResponse = await getPromptResponseApi(promptResponsePayload);

      return await promptResponse.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const sendEmails = createAsyncThunk(
  "prompt/sendEmails",
  async ({ subject, body }, { getState, rejectWithValue }) => {
    const {
      prompt: { selectedVendors },
    } = getState();

    try {
      const sendEmailsResponse = await sendEmailsApi({
        vendors: selectedVendors,
        subject,
        body,
      });

      const sendEmailsResponseData = await sendEmailsResponse.json();
    //   if (!sendEmailsResponseData.ok) {
    //     // assume API returns { error: "..."} on failure
    //     return rejectWithValue(
    //       sendEmailsResponseData.error || "Failed to send emails"
    //     );
    //   }

    //   return sendEmailsResponseData;
        console.log(sendEmailsResponseData, "send emails data");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const promptSlice = createSlice({
  name: "prompt",
  initialState,
  reducers: {
    setSelectedVendors(state, action) {
      state.selectedVendors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(getPromptResponse.pending, (state) => {
            state.loading = true;
            state.promptResponse = null;
            state.error = null;
        })
        .addCase(getPromptResponse.fulfilled, (state, action) => {
            state.loading = false;
            state.promptResponse = action.payload;
        })
        .addCase(getPromptResponse.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(sendEmails.pending, (state) => {
            state.sending = true;
            state.sendEmailsResponse = null;
            state.sendError = null;
        })
        .addCase(sendEmails.fulfilled, (state, action) => {
            state.sending = false;
            state.sendEmailsResponse = action.payload;
        })
        .addCase(sendEmails.rejected, (state, action) => {
            state.sending = false;
            state.sendError = action.payload;
        });
  },
});

export const { setSelectedVendors } = promptSlice.actions;
export default promptSlice.reducer;
