import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";

export const authUser = async (req, res, next) => {
    try {
        const token =
            req.cookies?.token ||
            ( req.headers.authorization.split(' ')[1]);
        
        if (!token) {
            return res.status(401).send({ error: 'Unauthorized User1' });
        }

        const isBlackListed = await redisClient.get(token);


        if (isBlackListed) {

            res.cookie('token', '');
            return res.status(401).send({ error: 'Unauthorized User2' });
        };


        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT Authentication Error:", error.message);
        res.status(401).send({ error: 'Unauthorized User3' });
    }
};
