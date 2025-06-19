import jwt from "jsonwebtoken";

export const login = (req, res) => {
    console.log("here");
    const { email, password } = req.body;
    console.log(req.body, "login creds");

    if (!email || !password) {
        console.error("Unauthorized - missing authorization credentials");
        res.status(401).json({ status: "Unauthorized" });
    }

    try {
        if (
            email !== process.env.AUTH_EMAIL &&
            password !== process.env.AUTH_PASSWORD
        ) {
            console.error("Unauthorized - invalid credentials");
            res.status(403).json({
                status: "Unauthorized - invalid credentials",
            });
        }

        const authorizationToken = jwt.sign(
            { email, password },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRY },
        );

        res.status(200).json({
            status: "Authorized",
            token: authorizationToken,
        });
    } catch (error) {
        console.error("auth.controllers - login", error);
        res.status(403).json({
            status: "Unauthorized",
            message: error.message,
        });
    }
};
