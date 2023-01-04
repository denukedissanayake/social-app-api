import { db } from "../connect.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export const register = (req, res) => {

    const query = "SELECT * FROM user WHERE username = ?" 

    db.query(query, [req.body.username], (err, data) => {
        if(err) return res.status(500).json(err);
        if(data.length) return res.status(409).json("Already Existing User");

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    
        const queryInsert = "INSERT INTO user (`username`, `email`, `password`, `name`) VALUE (?)";
    
        const values = [
            req.body.username,
            req.body.email,
            hashedPassword,
            req.body.name
        ]
     
        db.query(queryInsert, [values], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("User is Created");
        });
    });
}

export const login = (req, res) => {
    
    const query = "SELECT * FROM user WHERE username = ?" 

    db.query(query, [req.body.username], (err, data) => {
        if(err) return res.status(500).json(err);
        if(data.length === 0 ) return res.status(4054).json("User does not Exsist");

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);

        if(!checkPassword) return res.status(400).json("Invalid Password");

        const token = jwt.sign({id: data[0].id}, "secret-key-phrase");
        const {password, ...user} = data[0];

        res.cookie("accesstoken", token, {
            httpOnly: true,
        }).status(200).json(user);

    });

}

export const logout = (req, res) => {
    res.clearCookie("accesstoken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User Logged Out");
}