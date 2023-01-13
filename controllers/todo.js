const Todo = require("../models/todo");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const createtodo =async(req,res)=>{
    const reqBody=req.body;
    const todoName=reqBody['todoName']
    const todoDescription=reqBody['todoDescription']
    Todo.create(reqBody,(err,data)=>{
        if(err){
            res.status(400).json({status:"failed",data:err})
        }else{
            res.status(200).json({status:"success",data:data})
        }
    });

}
//select todo

const selectodo =async(req,res)=>{
    const email=req.body['email']
    Todo.find({email:email},(err,data)=>{
        if(err){
            res.status(400).json({status:"failed",data:err})
        }else{
            res.status(200).json({status:"success",data:data})
        }
    });

}

//update todo
//select todo

const updatetodo =async(req,res)=>{
    const todoName=req.body['todoName']
    const todoDescription=req.body['todoDescription']
    const _id=req.body['_id']
    const postBody={
        todoName:todoName,
        todoDescription:todoDescription,

    }
    Todo.updateOne({_id:_id},{$set:postBody},{upsert:true},(err,data)=>{
        if(err){
            res.status(400).json({status:"failed",data:err})
        }else{
            res.status(200).json({status:"success",data:data})
        }

    })

}

//delete todo

const deletetodo =async(req,res)=>{
    const _id=req.body['_id']

    Todo.remove({_id:_id},(err,data)=>{
        if(err){
            res.status(400).json({status:"failed",data:err})
        }else{
            res.status(200).json({status:"success",data:data})
        }
    })
}
module.exports={createtodo,selectodo,updatetodo,deletetodo};
