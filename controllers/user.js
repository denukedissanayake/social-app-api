import { db } from "../connect.js";

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
    res.json("User is updated")
}