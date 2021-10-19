const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/User')
// update user
router.put("/:id" , async (req, res) => {
    if(req.body.userId === req.params.id || req.body.idAdmin){
        if(req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password , salt)
            }catch (err){
                return res.status(500).json(err)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body})
            res.status(200).json("account has been uodated")
        } catch (err) {
            return res.status(500).json(err)
            
        }
    }
    else {
        return res.status(403).json('you can update only your account')
    }
})

// delete usre
router.delete("/:id" , async (req, res) => {
    if(req.body.userId === req.params.id || req.body.idAdmin){
        try {
            const user = await User.deleteOne({_id : req.params.id})
            res.status(200).json("account has been delete")
        } catch (err) {
            return res.status(500).json(err)
            
        }
    }
    else {
        return res.status(403).json('you can delete only your account')
    }
})

// get a user
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId ? await User.findById(userId) : await User.findOne({username});
        console.log(user._doc)
        const {password , updatedAt , ...other} = user._doc;
        res.status(200).json(other)
    } catch (err) {
        return res.status(500).json(err)
        
    }
}) 

//folower user
router.put("/:id/follow" , async(req, res) => {
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push : {followers : req.body.userId}});
                await currentUser.updateOne({$push : {followings : req.params.id}})
                res.status(200).json('user has been followed')
            }else {
                res.status(403).json("you allready follow this user")
            }
        }catch(err){
            res.status(500).json(err)
        }
    } 
     else {
    res.status(403).json("you cant follow yourself");
  }
})
//unfollow user
router.put("/:id/unfollow" , async(req, res) => {
    console.log("aaa")
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull : {followers : req.body.userId}});
                await currentUser.updateOne({$pull : {followings : req.params.id}})
                res.status(200).json('user has been unfollowed')
            }else {
                res.status(403).json("you dont unfollow this user")
            }
        }catch(err){
            res.status(500).json(err)
        }
    } 
     else {
    res.status(403).json("you cant unfollow yourself");
  }
})

module.exports= router;