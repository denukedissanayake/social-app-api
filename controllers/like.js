import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getLikesByPostId = (req, res) => {

    const token  = req.cookies.accesstoken;
    if(!token) return res.status(401).status("Login to react posts")

    jwt.verify(token, "secret-key-phrase", (err, user) => {
        if(err) return res.status(403).json("Invalid Token");

        const query =  `SELECT userid FROM likes WHERE postid = ${req.params.postid}`;

        db.query(query, (err, data) => {
            if(err) return res.status(500).json(err);

            return res.json(data.map(l => l.userid)).status(200);
        });
    });
}

export const addLikesByPostId = (req, res) => {

    const token  = req.cookies.accesstoken;
    if(!token) return res.status(401).status("Login to react posts")

    jwt.verify(token, "secret-key-phrase", (err, user) => {
        if(err) return res.status(403).json("Invalid Token");

        const query =  "INSERT INTO likes (`userid`, `postid`) VALUES (?)";

        const values = [
            user.id,
            parseInt(req.body.postid)
        ];

        db.query(query, [values], (err, data) => {
            if(err) return res.status(500).json(err);

            return res.json("Like Added").status(200);
        });
    });
}

export const deleteLikesByPostId = (req, res) => {

    const token  = req.cookies.accesstoken;
    if(!token) return res.status(401).status("Login to react posts")

    jwt.verify(token, "secret-key-phrase", (err, user) => {
        if(err) return res.status(403).json("Invalid Token");

        const query =  `DELETE FROM likes WHERE postid = ${req.query.postid} AND userid = ${user.id}`;

        db.query(query, (err, data) => {
            if(err) return res.status(500).json(err);

            return res.json("Like Removed").status(200);
        });
    });
}