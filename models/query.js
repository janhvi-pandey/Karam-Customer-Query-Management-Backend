
const express = require("express");
const mongoose=require('mongoose');
const querySchema=mongoose.Schema({
    uid:{
        type:String,
    },
    department:{
        type:String,
    },
    subject:{
        type:String,
    },
    description:{
        type:String,
    },
    status:{
        type:String,
    }

},{timestamps:true})
const Query=mongoose.model('query',querySchema);
module.exports=Query;