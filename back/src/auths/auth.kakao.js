class Kakao {
    constructor({ axios, qs, jwt, User }) {
        this.axios = axios;
        this.qs = qs
        this.User = User
        this.jwt = jwt
        this.KKO_HOST = `https://kauth.kakao.com`
        this.REST_API_KEY = `e6dfa1b635337a7d85d3ef92c885670c`
        this.REDIRECT_URI = `http://localhost:3000/auths/kakao`
        this.CLIENT_SERCRET = `liSNdnbPh4yEOm9ZqSuocwothsK1tbKa`
    }


    async getToken({code}){
        const headers = {
            "Content-type" : "application/x-www-form-urlencoded;charset=utf-8"
        }
        const host = `${this.KKO_HOST}/oauth/token`
        const body = this.qs.stringify({
            grant_type:'authorization_code',
            client_id: this.REST_API_KEY,
            redirect_uri: this.REDIRECT_URI,
            code,
            client_secret: this.CLIENT_SERCRET,
        })

        const {data} = await this.axios.post(host,body, headers)
        return data
    }

    async kakaoSignup({data}){

        const payload = {
            userid: data.id,
            userpw: this.jwt.crypto.createHmac('sha256',jwt.SALT).update(data.id).digest('hex'),
            username: data.kakao_account.profile.nickname,
            nickname: data.kakao_account.profile.nickname,
            gender: data.kakao_account.gender,
            userImg: data.kakao_account.profile.profile_image_url
        }
        // this.User.create()
    }


    async login(req, res, next) {
        try {
            const {code} = req.query
            const {access_token} = await this.getToken({code})
            const host = `https://kapi.kakao.com/v2/user/me`
            const {data} = await this.axios.post(host, null, {
                headers: {
                    "COntent-type" : "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${access_token}`
                }
            })

            await this.kakaoSignup({data})
            res.cookie()
            res.redirect("http://localhost:3005")
            
        } catch (e) {
            next(e);
        }
    }

}


module.exports = Kakao;

