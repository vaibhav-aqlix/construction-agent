// const serverUrl = "https://5q2ifjbt54.execute-api.ap-south-1.amazonaws.com/staging";
const serverUrl = import.meta.env.VITE_BACKEND_URL;

// export const getPromptResponseApi = async (promptResponsePayload, authToken) => {
export const getPromptResponseApi = async (promptResponsePayload) => {
    try {
        // const promptResponse = await fetch(`${serverUrl}/api/v1/search-vendors/gemini`, {
        const promptResponse = await fetch(`${serverUrl}/api/v1/search-vendors/chatgpt`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${authToken}`,  
            },
            body: JSON.stringify(promptResponsePayload),
        })

        return promptResponse;
    } catch (error) {
        console.error()
    }
    // if (authToken) {
    // }
}

// export const getPromptResponseApi = async (promptResponsePayload, authToken) => {
export const sendEmailsApi = async (vendorsPayload) => {
    try {
        // const promptResponse = await fetch(`${serverUrl}/api/v1/search-vendors/gemini`, {
        const sendEmailsApiResponse = await fetch(`${serverUrl}/api/v1/send-emails/vendors`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${authToken}`,  
            },
            body: JSON.stringify(vendorsPayload),
        })

        return sendEmailsApiResponse;
    } catch (error) {
        console.error()
    }
    // if (authToken) {
    // }
}