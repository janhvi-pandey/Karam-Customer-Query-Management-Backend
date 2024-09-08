const express = require("express");
const queryRoute = express.Router();
const Query=require('../models/query')

queryRoute.get('/getquery',async(req,res)=>{
    const result=await Query.find();
    res.send(result)
})
queryRoute.get('/getpenquery/:id',async(req,res)=>{
  const id=req.params.id;
  const result=await Query.find({u_id:id,status:"pen"})
  res.send({msg:"Success",result:result})
})

queryRoute.post('/addquery',async(req,res)=>{
  const query=req.body;
  console.log(query);
  const result=Query.create(req.body);
  res.send({msg:"Query added"});
});



module.exports=queryRoute;