const serverUrl = import.meta.env.VITE_BACKEND_URL;

export const loginUserApi = async (email,password) => {
    // const authToken = localStorage.getItem("authToken");
    console.log(email,password, "api creds")
    const creds = {
        email,
        password
    }

    try {
        const loginUserResponse = await fetch(`${serverUrl}/api/v1/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${authToken}`,  
            },
            body: JSON.stringify(creds),
        })

        console.log("logoinm", loginUserResponse)

        return loginUserResponse;
    } catch (error) {
        console.error()
    }
    // if (authToken) {
    // }
}