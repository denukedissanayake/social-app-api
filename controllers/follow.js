import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getFollowedUsers = (req, res) => {

    const query = "SELECT followeduserid FROM relationships WHERE followeruserid  = ?" 

    db.query(query, [req?.query?.userid], (err, data) => {
        if(err) return res.status(500).json(err);

        res.status(200).json(data.map(id => id.followeduserid));

    }); 
}

export const followUser = (req, res) => {
    const token  = req.cookies.accesstoken;
    if(!token) return res.status(401).status("Login to follow others")

    jwt.verify(token, "secret-key-phrase", (err, user) => {
        if(err) return res.status(403).json("Invalid Token");

        const query =  "INSERT INTO relationships (`followeruserid`, `followeduserid`) VALUES (?)";

        const values = [
            user.id,
            req.body.followeduserid,
        ]

        db.query(query, [values], (err, data) => {
        if(err) return res.status(500).json(err);

        return res.json("User followed").status(200);
        });
    });
}

export const unfollowUser = (req, res) => {
    console.log(req.body);

    const token  = req.cookies.accesstoken;
    if(!token) return res.status(401).status("Login to follow others")

    jwt.verify(token, "secret-key-phrase", (err, user) => {
        if(err) return res.status(403).json("Invalid Token");

        const query =  `DELETE FROM relationships WHERE  followeruserid=${user.id} AND  followeduserid=${req.body.followeduserid}`;

        db.query(query, (err, data) => {
        if(err) return res.status(500).json(err);

        return res.json("User un-followed").status(200);
        });
    });
}
