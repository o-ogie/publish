const express = require("express");
const router = express.Router();
const { adminController: controller, jwt } = require("./admin.module");

router.use((req,res,next)=>{
    const cookie = req.cookies.token
    
    if(!cookie){
        throw new Error('token이 없습니다.')
    }
    const {level} = jwt.decode(cookie.split('.')[1])
    if(level !=='admin') throw new Error('권한이 없습니다.')
    next()
})

router.get("/all",(req,res,next)=>controller.getAll(req,res,next))
router.get('/total',(req,res,next)=> controller.getTotal(req,res,next))
router.get('/tagRank',(req,res,next)=>controller.getHashrank(req,res,next))
router.get('/dayList',(req,res,next)=>controller.dayList(req,res,next))
router.get('/timeList',(req,res,next)=>controller.timeList(req,res,next))


module.exports= router