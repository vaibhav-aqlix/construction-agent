import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
        console.error("Unauthorized - missing authorization token");
        return res
            .status(401)
            .json({ message: "Unauthorized - missing authorization token" });
    }

    try {
        const authorizationToken = authToken.split(" ")[1];
        const authorizationPayload = jwt.verify(
            authorizationToken,
            process.env.JWT_SECRET,
        );

        if (!authorizationPayload) {
            console.error("Unauthorized - invalid authorization token");
            return res
                .status(401)
                .json({
                    message: "Unauthorized - invalid authorization token",
                });
        }

        req.user = authorizationPayload;
        console.log("auth.middleware - authMiddleware", authorizationPayload);
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res
            .status(401)
            .json({ status: "Unauthorized", message: error.message });
    }
};
