class AdminRepository{

    constructor({ sequelize, User, Board }){
        this.sequelize = sequelize
        this.User = User
        this.Board = Board
    }

    async getUsers(){
        const user = await this.User.findAll({
          raw:true,
          attributes: { exclude: ["userpw"]},
          where:{
            level:'user'
          }
        })
        return user
      }

    async hitLike_count(){
        try{
            const sql = `SELECT (SELECT SUM(hit) FROM Board) AS hitSum, (SELECT COUNT(userid) FROM Liked) AS likeCount;`
            const total = await this.sequelize.query(sql)
            return total

        }catch(e){
            throw new Error (e)
        }
    }

    async hash(){
        try{
            const sql = `SELECT tagname, COUNT(tagname) AS HashCount FROM Hashtag GROUP BY tagname;`
            const result = await this.sequelize.query(sql)
            return result
        }catch(e){
            throw new Error(e)
        }
    }


    async eachday(){
        try{
            const sql = `SELECT * FROM (SELECT *, SUBSTR(_UTF8'일월화수목금토', DAYOFWEEK(createdAt),1) AS WEEK FROM Board) WK_table WHERE createdAt > date_add(now(),interval -7 day);`
            const [result] = await this.sequelize.query(sql)
            return result
        }catch(e){
            throw new Error(e)
        }
    }

    async eachTime(){
        try{
            const sql = 'SELECT HOUR(createdAt)'
        }catch(e){
            throw new Error(e)
        }
    }
}

module.exports = AdminRepository
