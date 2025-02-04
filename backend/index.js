import express from "express";
import pkg from "pg";
const {Client}=pkg;
import cors from "cors";
import bcrypt from "bcrypt";

const app=express();
app.use(cors());
app.use(express.json());

const pgClient=new Client("postgresql://neondb_owner:DjtWv2m0HVNZ@ep-plain-hat-a8sxotp9-pooler.eastus2.azure.neon.tech/neondb?sslmode=require");
pgClient.connect();

app.post("/api/login",async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    //console.log(email+"  "+password);

    try{

        const query1="SELECT * FROM users WHERE email=$1";
        const result=await pgClient.query(query1,[email]);

        //user exixt
        if(result.rows.length>0){
            const user=result.rows[0];
            const isMatch=await bcrypt.compare(password,user.password);

            if(isMatch){
                const user_id=user.id;
                const getTodoQuery="SELECT * FROM todos WHERE user_id=$1";
                const resultTodoQuery=await pgClient.query(getTodoQuery,[user_id]);
                const todos=resultTodoQuery.rows;
                console.log(todos);

                res.json({success:true,message:"user exist",todos});
            }
            else{
                res.json({success:false,message:"Incorrect Credentials!"});
            }
        }

        // if user not exist
        const hashedPassword=await bcrypt.hash(password,10); //10-saltround
        const query2="INSERT INTO users(email,password) VALUES($1,$2) RETURNING id";
        const result2=await pgClient.query(query2,[email,hashedPassword]);

        const user_id=result2.rows[0].id;

        res.json({
            success:true,
            user_id:user_id,
            message:"new user created"
        })

        // const insertQuery="INSERT INTO users(email,password) VALUES($1,$2) RETURNING id";
        // const response=await pgClient.query(insertQuery,[email,password]);

        // const user_id=response.rows[0].id;

        // res.json({
        //     success:true,
        //     user_id:user_id
        // })

    }catch(e){
        console.log(e.message);
        res.json({success:false,message:"Error while login"})
    }
})

app.post("/api/createTodo",async(req,res)=>{
    const user_id=req.body.user_id;
    const title=req.body.title;
    const status=req.body.status;

    try{
        const query2="INSERT INTO todos(user_id,title,status) VALUES($1,$2,$3) RETURNING id";
        const response=await pgClient.query(query2,[user_id,title,status]);

        const todoId=response.rows[0].id;
        res.json({success:true,id:todoId});
    }catch(e){
        console.log("Error "+e.message);
        res.json({success:false})
    }
})

app.delete("/api/deleteTodo",async(req,res)=>{
    const id=req.body.id;
    //console.log("Todo is"+id);
    
    try{
        const query="DELETE FROM todos WHERE id=$1";
        const response=await pgClient.query(query,[id]);

        res.json({success:true});
    }catch(e){
        res.json({success:false});
    }
})

app.put("/api/updateStatus",async(req,res)=>{
    const id=req.body.id;
    const status=req.body.status;
   // console.log("status "+status);

    try{
        const query="UPDATE todos SET status=$1 WHERE id=$2";
        const response=await pgClient.query(query,[status,id]);

        res.json({success:true});
    }catch(e){
        res.json({success:false});
    }

    
})


app.listen(8080,()=>{
    console.log("Server is running on 8080 port");
})