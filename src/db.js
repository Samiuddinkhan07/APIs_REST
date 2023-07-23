import { MongoClient } from "mongodb";


let client;

export const InitializeDbConnection =  async () =>{
    client = await MongoClient.connect(process.env.API_MONGOURI,{
        useNewUrlParser: true,
        useUnifiedTopology:true,
    });
}

export const getDbConnection = dbname =>{
    const db = client.db(dbname);
    return db;
}