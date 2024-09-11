const express = require("express");
const router = express.Router();
const User=require('../models/User')


router.post("/", async (req, res) => {
  try {
      const result = await User.create(req.body);
      console.log(result);
      return res.send({ msg: "Success" });
  } catch (error) {
      return res.status(500).send({ msg: "Internal Server Error" });
  }
});

//to register
router.post("/register", async (req, res) => {
  try {
    const result = await User.create(req.body); 
    console.log(result);
    
   
    return res.status(201).send({ msg: "Success", id: result._id });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).send({ msg: "Internal Server Error" });
  }
});


router.post("/login", async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
          if (user.password === password) {
              return res.send({ msg: "Login Success", id: user._id });
          } else {
              return res.send({ msg: "Invalid Password" });
          }
      } else {
          return res.send({ msg: "User does not exist" });
      }
  } catch (error) {
      return res.status(500).send({ msg: "Internal Server Error" });
  }
});

  router.get("/", async (req, res) => {
    const result = await User.find();
    return res.send(result);
  });
  router.get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await User.findById(id);
      if (result) {
        return res.json(result); // Ensure the response is JSON
      } else {
        return res.status(404).json({ msg: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ msg: "Internal Server Error" });
    }
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
      const result = await User.findByIdAndDelete(id);
      return res.send({ msg: "Success" });
    } catch (error) {
      return res.send({ msg: error });
    }
  });



  module.exports=router;