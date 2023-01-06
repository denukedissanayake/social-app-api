import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {

    const token  = req.cookies.accesstoken;
    if(!token) return res.status(401).status("Login to check posts")

    jwt.verify(token, "secret-key-phrase", (err, user) => {
        if(err) return res.status(403).json("Invalid Token");

        const query =  `
            SELECT p.*, u.id AS userid, name, profilepic 
            FROM post AS p 
            JOIN user AS u ON (p.userid = u.id) 
            LEFT JOIN relationships AS r ON (r.followeduserid = p.userid)
            WHERE r.followeruserid = ${user.id} OR p.userid = ${user.id}
            ORDER BY p.createdAt DESC 
            `;

        db.query(query, (err, data) => {
        if(err) return res.status(500).json(err);

        return res.json(data).status(200);
        });
    });
}