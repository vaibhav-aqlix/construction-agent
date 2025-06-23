// const serverUrl = "https://5q2ifjbt54.execute-api.ap-south-1.amazonaws.com/staging";
const serverUrl = import.meta.env.VITE_BACKEND_URL;

export const loginUserApi = async (email, password) => {
    try {
        const loginUserResponse = await fetch(`${serverUrl}/api/v1/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        })

        return await loginUserResponse.json();
    } catch (error) {
        console.error()
    }
}