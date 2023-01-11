import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUserById = (req, res) => {
    const query = "SELECT * FROM user WHERE id = ?" 

    db.query(query, [req?.params?.userid], (err, data) => {
        if(err) return res.status(500).json(err);
        if(data.length === 0 ) return res.status(404).json("User does not Exsist");

        const {password, ...user} = data[0];
        res.status(200).json(user);

    });
}

export const updateUserById = (req, res) => {
    const token  = req.cookies.accesstoken;
    if(!token) return res.status(401).status("Login to update profile")

    jwt.verify(token, "secret-key-phrase", (err, user) => {
        if(err) return res.status(403).json("Invalid Token");

        const query =  "UPDATE user SET `name`=?, `city`=?, `profilepic`=?, `coverpic`=?, `website`=? WHERE id=?";

        const values = [
            req.body.name,
            req.body.city,
            req.body.profilepic,
            req.body.coverpic,
            req.body.website,
            user.id,
        ]

        db.query(query, values, (err, data) => {
            if(err) return res.status(500).json(err);
            return res.json("Profile Updated").status(200);
        });
    });
}