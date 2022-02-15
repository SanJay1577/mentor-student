// const express = require('express');
// const {MongoClient} = require ('mongodb')
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = 3200;

const MONGO_URL = process.env.MONGO_URL;

async function createConnection(){
    const client = new MongoClient(MONGO_URL)
    await client.connect();
    console.log("Mongo is connected") //checking wheter mongo is connected 
    return client;

}

const client = await createConnection(); 

app.use(express.json());

app.get("/mentors",   async (req,res)=>{
    console.log(req.query)
    const mentor =  await client
    .db("mentorstudent")
    .collection("mentors")
    .find(req.query)
    .toArray();
    res.send(mentor);
});


app.get("/mentors/:id",  async (req,res)=>{
    const{id}= req.params;
    const mentor = await client.db("mentorstudent").collection("mentors").findOne({id:id});
    mentor ? res.send(mentor) : res.status(404).send({message:"No Mentors Found On this Id"});
});

app.delete("/mentors/:id",  async (req,res)=>{
    const{id}= req.params;
    const mentor = await client.db("mentorstudent").collection("mentors").deleteOne({id:id});
    mentor ? res.send(mentor) : res.status(404).send({message:"No Mentors Found On this Id"});
});

app.post("/mentors", async (req,res)=>{
    const newMentor = req.body;
    console.log(req.body)
    const postedMentor = await client
    .db("mentorstudent")
    .collection("mentors")
    .insertMany(newMentor);
    res.send(postedMentor);
});


app.get("/students", async (req,res)=>{
    console.log(req.query);
    const student = await client
    .db("mentorstudent")
    .collection("students")
    .find(req.query)
    .toArray();
    res.send(student);
});

app.post("/students", async (req,res)=>{
    const newStudent = req.body;
    const postedStudent = await client
    .db("mentorstudent")
    .collection("students")
    .insertMany(newStudent);
    res.send(postedStudent);
});


app.get("/students/:id",  async (req,res)=>{
    const{id}= req.params;
    const student = await client.db("mentorstudent").collection("students").findOne({id:id});
    res.send(student);
});

app.delete("/students/:id",  async (req,res)=>{
    const{id}= req.params;
    const student = await client.db("mentorstudent").collection("students").deleteOne({id:id});
    res.send(student);
});

app.listen(PORT, ()=>console.log(`Server Started in localhost:${PORT} `)); 