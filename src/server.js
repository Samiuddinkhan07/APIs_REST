import express from "express";
// import path from 'path';
import { InitializeDbConnection } from "./db.js";
import { routes } from "./routes/index.js";
// import fs from 'fs';
// import { fileURLToPath } from "url";
import dotenv from 'dotenv'


dotenv.config();

// const __filename =fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8000;


const app = express();

app.use(express.json());
// app.use(express.static(path.join(__dirname,'../build')));

// app.get('/^(?!\/api).+/' , (req,res) =>{
//     res.sendFile(path.join(__dirname,'..'))
// })

routes.forEach(route =>{
    app[route.method](route.path,route.handler);
});



InitializeDbConnection().then(() =>{
    app.listen(8000, () =>{
        console.log("server is Up 8000");
    })
})