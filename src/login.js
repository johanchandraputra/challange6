const { json } = require("express");
const express = require("express");
const fs = require("fs");
const router = require("../router/login");

const getUser = (data, req) => {
    return data.find((a) => a.user == req);
};

const login = (req, res) => {
    console.log(req.body);
    if (req.body.user == "") {
        return res.status(400).json({message: "user is empty"});
    }
    fs.readFile("./src/admin.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({message: "Data not found"})
        }
        let parse = JSON.parse(data);
        let user = getUser(parse, req.body.user);
        if(!user) {
           return res.status(401).json({message :"user is wrong"});
        }
        if(user.password != req.body.password){
            return res.status(401).json({message :"password is wrong"});
        }

        res.status(200).json({message:"login success", user: user.user});
        console.log("login sucess");
    })
   
}


module.exports = login;