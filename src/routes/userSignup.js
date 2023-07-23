import { getDbConnection } from "../db.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


export const userSignUp = {
    path:"/api/signup",
    method:"post",
    handler:async (req,res) =>{
        const {username,email,password} = req.body;
        const db = getDbConnection(process.env.API_DB_NAME);
        const user = await db.collection("users").findOne({email});

        //if user already exist
        if(user){
            res.sendStatus(409);
            return
        }

        //encrypt password

        const passwordHash = await bcrypt.hash(password,10);

        //insert 
        const result = await db.collection('users').insertOne({
            email,
            passwordHash,
            username,
            isEmailVerified:false,
            apiVersion:1
        })

        const inserId = {result};

        jwt.sign(
            {
                _id:inserId,
                email,
                username,
                isEmailVerified:false
            },
            process.env.JWT_SECRET,
            {
                expiresIn:process.env.API_LOGIN_PERIOD
            },
            (err,token) =>{
                if(err){
                    console.log(err);
                    res.status(500).send(err);
                }
                res.status(200).json({token})
            }
        )
    }
}