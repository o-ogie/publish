class UserService {
    constructor({ userRepository, jwt, config }) {
        this.userRepository = userRepository;
        this.jwt = jwt;
        this.BadRequest = config.exception.BadRequest;
        this.crypto = jwt.crypto;
        this.config = config;
    }

    async signup(userData) {
        try {
            userData.address = `${userData.address} ${userData.detailAddress}`;
            userData.userImg = userData.userImg ? `http://${this.config.host}:${this.config.imgport}/${userData.userImg}` : undefined;
            const { userid, username, userpw, ...rest } = userData;
            if (!userid || !userpw || !username) throw "내용이 없습니다";
            const hash = this.crypto.createHmac("sha256", this.config.SALT).update(userpw).digest("hex");
            const user = await this.userRepository.addUser({
                userid,
                username,
                userpw: hash,
                ...rest,
            });
            return user;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }

    async userCheck(user) {
        // console.log(`serv :`, user)
        try {
            const userCheck = await this.userRepository.findUser(user);
            return userCheck;
        } catch (e) {
            throw new Error(e);
        }
    }

    async me(token) {
        try {
            const { userid } = this.jwt.verifyToken(token, this.config.SALT);
            const user = await this.userRepository.getUserById(userid);
            // console.log(user)
            return user;
        } catch (e) {
            throw new Error(e);
        }
    }

    async putProfile(userData) {
        try {
            console.log(`userData ::::`, userData);
            if (userData.userImg.indexOf("http://") === -1) userData.userImg = `http://${this.config.host}:${this.config.port}/${userData.userImg}`;
            const { userpw, ...rest } = userData;
            const hash = this.crypto.createHmac("sha256", this.config.SALT).update(userpw).digest("hex");

            const user = await this.userRepository.updateProfile({
                userpw: hash,
                ...rest,
            });
            if (user === 1) {
                console.log(`user :::::::`, 1);
                const modified = await this.userRepository.getUserById(userData.userid);
                const token = await this.jwt.createToken(modified);
                console.log(`token :::::::`, token);
                return token;
            } else {
                const error = new Error("수정 실패");
                error.status = 401;
                throw error;
            }
        } catch (e) {
            throw new Error(e);
        }
    }
    async deleteUser(user) {
        try {
            console.log(`user :::::`, user);
            const drop = await this.userRepository.destroyUser(user);
            return drop;
        } catch (e) {
            throw new Error(e);
        }
    }

    async findPoint(userid) {
        try {
            const point = await this.userRepository.findPoint(userid);
            return point;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }
}

module.exports = UserService;

