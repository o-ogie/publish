// const salt = crypto.randomBytes(16).toString('hex')
// const salt = require('../config')


class JWT {
    constructor({ crypto, SALT }) {
        this.crypto = crypto
        this.salt = SALT
    }
    createToken(payloadData) {
        const header = this.encode({ tpy: "JWT", alg: "HS256"})
        const payload = this.encode(payloadData)
        const signature = this.createSignature([header, payload])

        return [header, payload, signature].join(".")
    }

    encode(value) {
        return Buffer.from(JSON.stringify(value)).toString("base64Url")
    }

    decode(encodedValue) {
        return JSON.parse(Buffer.from(encodedValue, "base64Url").toString("utf-8"))
    }

    createSignature(sourceArr, salt = this.salt) {
        const splitArr = sourceArr.join(".")
        return this.crypto.createHmac("sha256", salt).update(splitArr).digest("base64Url")
    }

    verifyToken(token, salt=this.salt) {
        const [header, payload, signature] = token.split(".")
        const newSignature = this.createSignature([header, payload], salt)
        if (newSignature !== signature) {
            throw new Error("토큰값이 다릅니다")
        }

        return this.decode(payload)
    }
}

module.exports = JWT