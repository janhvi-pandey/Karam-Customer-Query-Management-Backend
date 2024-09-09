const express = require("express");
const queryRoute = express.Router();
const Query=require('../models/query')

queryRoute.get('/getquery',async(req,res)=>{
    const result=await Query.find();
    res.send(result)
})
queryRoute.get('/getpenquery/:id',async(req,res)=>{
  const id=req.params.id;
  const result=await Query.find({uid:id,status:"pen"})
  res.send({msg:"Success",result:result})
})


queryRoute.get('/getproquery/:id',async(req,res)=>{
  const id=req.params.id;
  const result=await Query.find({uid:id,status:"pro"})
  res.send({msg:"Success",result:result})
})
queryRoute.get('/getcomquery/:id',async(req,res)=>{
  const id=req.params.id;
  const result=await Query.find({uid:id,status:"com"})
  res.send({msg:"Success",result:result})
})
queryRoute.post('/addquery',async(req,res)=>{
  const query=req.body;
  console.log(query);
  const result=Query.create(req.body);
  res.send({msg:"Query added"});
});


queryRoute.get('/getuserquerycounts/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const pendingCount = await Query.countDocuments({ uid: id, status: 'pen' });
    const processingCount = await Query.countDocuments({ uid: id, status: 'pro' });
    const completedCount = await Query.countDocuments({ uid: id, status: 'com' });

    res.json({
      pendingCount,
      processingCount,
      completedCount,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user query counts' });
  }
});




module.exports=queryRoute;