const express = require("express");
const router = express.Router();
const User=require('../models/User')

router.post("/", async (req, res) => {
    const result = await User.create(req.body);
    return res.send({ msg: "Success" });
  });
  
  router.post("/login",async(req,res)=>{
      const{email,password}=req.body;
      const user=await User.findOne({email})
      if(user){
          if(user.password===password){
              return res.send({msg:"Login Success",id:user._id});
          }
          else{
              return res.send({msg:"Invalid Password"});
          }
      }
      else{
          return res.send({msg:"User does not exist"});
      }
  })
  router.get("/", async (req, res) => {
    const result = await User.find();
    return res.send(result);
  });
  router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const result = await User.findById(id);
    return res.send(result);
  });
  router.patch("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await User.findByIdAndUpdate(id, req.body);
      return res.send({ msg: "Success" });
    } catch (error) {
      return res.send({ msg: error });
    }
  });
  router.delete("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await Emp.findByIdAndDelete(id);
      return res.send({ msg: "Success" });
    } catch (error) {
      return res.send({ msg: error });
    }
  });

  module.exports=router;