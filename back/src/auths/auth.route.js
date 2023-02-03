const express = require("express");
const router = express.Router();
const qs = require('qs')
const { authController: controller, kakao } = require("./auth.module");

router.post("/", (req, res, next) => controller.postLogin(req, res, next));

router.get('/kakao',(req,res,next)=> kakao.login(req,res,next))

// const KKO_HOST = `https://kauth.kakao.com`
// const REST_API_KEY = `e6dfa1b635337a7d85d3ef92c885670c`
// const REDIRECT_URI = `http://localhost:3000/auths/kakao`
// const CLIENT_SERCRET = `liSNdnbPh4yEOm9ZqSuocwothsK1tbKa`
// const axios = require('axios')

// router.get('/kakao',async(req,res)=>{
//     const {code} = req.query
    // const headers = {
    //     "Content-type" : "application/x-www-form-urlencoded;charset=utf-8"
    // }

    // const host = `${KKO_HOST}/oauth/token`
    // const body = qs.stringify({
    //     grant_type:'authorization_code',
    //     client_id: REST_API_KEY,
    //     redirect_uri: REDIRECT_URI,
    //     code,
    //     client_secret: CLIENT_SERCRET,
    // })

    // const response = await axios.post(host,body, headers)
    // console.log(response.data)

    // try{
    //     const {access_token} = response.data
    //     const host = `https://kapi.kakao.com/v2/user/me`
    //     const user = await axios.post(host, null, {
    //         headers: {
    //             "COntent-type" : "application/x-www-form-urlencoded",
    //             Authorization: `Bearer ${access_token}`
    //         }
    //     })

    //     console.log(user)
    // }catch(e){

    // }

    // res.redirect("http://localhost:3005")
// })

module.exports = router;
