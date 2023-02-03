const express = require("express");
const app = express();
const axios = require("axios");
const qs = require("qs");


module.exports = () => {
    // KAKAO LOGIN
const KKO_HOST = `https://kauth.kakao.com`;
const REST_API_KEY = `1fe7ae4bf45bdf9bd6fc758bd63e9e0f`;
const REDIRECT_URI = `http://localhost:3000/auths/kakao`;
const CLIENT_SERCRET = `1NLiTnJ7OOm09XyI4PrGAgIPwKispRor`;

app.get("/oauth/kakao", async (req, res, next) => {
  const { code } = req.query;
  // code: 'igu6-Lz_XYYpKXYGyxoQPXaJBQLObxo-zob2vgOFx2l6GEGqJ2b9i0Hq5W2tUGAQKOfqOwo9dBEAAAGFyBc0-w'

  // token
  const host = `${KKO_HOST}/oauth/token`;
  const headers = {
    "Content-type": "application/x-www-form-urlencoded",
  };
  const body = qs.stringify({
    grant_type: "authorization_code",
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    code, 
    client_secret: CLIENT_SERCRET, // =salt
  });

  const response = await axios.post(host, body, headers);
  console.log(`token :`, response.data); // token

  try {
    const { access_token } = response.data;
    const host = `https://kapi.kakao.com/v2/user/me`;
    const user = await axios.post(host, null, {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${access_token}`,
      },
    });
    // console.log(`user :`,user);
    const userData = await axios({
        method:'get',
        url:'https://kapi.kakao.com/v2/user/me',
        headers:{
            Authorization: `Bearer ${access_token}`
        }
    })
    console.log(`userid :::`, userData.data.id)
    console.log(`username :::`, userData.data.id)
    console.log(`nickname :::`, userData.data.kakao_account.profile.nickname)
    console.log(`email :::`, userData.data.kakao_account.email)
    console.log(`gender :::`, userData.data.kakao_account.gender)
    console.log(`userImg :::`, userData.data.kakao_account.profile.profile_image_url)

    // 사용자 DB에 저장하기 ~ provider, snsId
    // 사용자측 토큰 형식에 맞게 재발급해서 클라이언트에 건네기
  } catch (e) {
    next(e);
  }

  res.redirect("http://localhost:3005");
});
}


