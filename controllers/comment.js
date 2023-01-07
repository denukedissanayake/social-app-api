import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getCommentsByPostId = (req, res) => {

    const token  = req.cookies.accesstoken;
    if(!token) return res.status(401).status("Login to check comments")

    jwt.verify(token, "secret-key-phrase", (err, user) => {
        if(err) return res.status(403).json("Invalid Token");

        const query =  `
            SELECT c.*, u.id AS userid, name, profilepic 
            FROM comment AS c 
            JOIN user AS u ON (c.userid = u.id) 
            WHERE c.postid= ${req.params.postid}
            ORDER BY c.createdAt DESC 
            `;

        db.query(query, (err, data) => {
        if(err) return res.status(500).json(err);

        return res.json(data).status(200);
        });
    });
}

export const addComments = (req, res) => {

    const token  = req.cookies.accesstoken;
    if(!token) return res.status(401).status("Login to add comments")

    jwt.verify(token, "secret-key-phrase", (err, user) => {
        if(err) return res.status(403).json("Invalid Token");

        const query =  "INSERT INTO comment (`description`, `postid`, `userid`, `createdAt`) VALUES (?)";

        const values = [
            req.body.description,
            req.body.postid,
            user.id,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ]

        db.query(query, [values], (err, data) => {
        if(err) return res.status(500).json(err);

        return res.json("Comment Added").status(200);
        });
    });
}