import express from "express";
const {Client} = pkg;
import authMiddleware from "./authMiddleware";

const pgClient=new Client("postgresql://neondb_owner:DjtWv2m0HVNZ@ep-plain-hat-a8sxotp9-pooler.eastus2.azure.neon.tech/neondb?sslmode=require");
pgClient.connect();

const app=express();
app.use(express.json());

app.post("/api/signup",async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    console.log(email,password);

    try{
        const query="INSERT INTO users(email,password) VALUES($1,$2)";
        const response=await pgClient.query(query,[email,password]);

        res.json({success:true});
    }catch(e){
        res.json({success:false,error:e.message})
    }

})

app.post("/api/signin",authMiddleware,async(req,res)=>{

})

app.listen(3030,()=>{
    console.log("Server is runnig on port 3030");
})