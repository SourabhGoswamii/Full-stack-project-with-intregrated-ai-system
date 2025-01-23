import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
    try {
        const token =
            req.cookies?.token ||
            ( req.headers.authorization.split(' ')[1]);
        
        if (!token) {
            return res.status(401).send({ error: 'Unauthorized User' });
        }

        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT Authentication Error:", error.message);
        res.status(401).send({ error: 'Unauthorized User' });
    }
};
