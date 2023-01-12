import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {

    const token  = req.cookies.accesstoken;
    if(!token) return res.status(401).status("Login to check posts")

    const userId = req.query.userid;

    jwt.verify(token, "secret-key-phrase", (err, user) => {
        if(err) return res.status(403).json("Invalid Token");

        const query = userId ? `
            SELECT p.*, u.id AS userid, name, profilepic
            FROM post AS p 
            JOIN user AS u ON (p.userid = u.id) 
            WHERE p.userid = ${userId}
            ORDER BY p.createdAt DESC 
            ` : `
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

export const addPosts = (req, res) => {

    const token  = req.cookies.accesstoken;
    if(!token) return res.status(401).status("Login to add posts")

    jwt.verify(token, "secret-key-phrase", (err, user) => {
        if(err) return res.status(403).json("Invalid Token");

        const query =  "INSERT INTO post (`description`, `image`, `userid`, `createdAt`) VALUES (?)";

        const values = [
            req.body.description,
            req.body.image,
            user.id,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ]

        db.query(query, [values], (err, data) => {
        if(err) return res.status(500).json(err);

        return res.json("Post Created").status(200);
        });
    });
}


export const deletePost = (req, res) => {

    const token  = req.cookies.accesstoken;
    if(!token) return res.status(401).status("Login to delete posts")

    jwt.verify(token, "secret-key-phrase", (err, user) => {
        if(err) return res.status(403).json("Invalid Token");

        const query =  `DELETE FROM post WHERE id=${req.params.postid} AND userid=${user.id}`;

        db.query(query, (err, data) => {
        if(err) return res.status(500).json(err);

        return res.json("Post Deleted").status(200);
        });
    });
}