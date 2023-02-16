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
            // console.log("result::::",result)
            return result
        }catch(e){
            throw new Error(e)
        }
    }


    async eachDay(){
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
            const sql = 'SELECT *, HOUR(createdAt) AS HOUR FROM Board;'
            const result = await this.sequelize.query(sql)
            console.log('result::::',result)
            return result
        }catch(e){
            throw new Error(e)
        }
    }

    async category_gender_like(){
        try{
            const sql =`SELECT 
            c.category,
            COUNT(CASE WHEN u.gender = 'male' THEN 1 END) AS male,
            COUNT(CASE WHEN u.gender = 'female' THEN 1 END) AS female
          FROM 
            category c 
            LEFT JOIN board b ON c.category = b.category 
            LEFT JOIN liked l ON b.id = l.boardid 
            LEFT JOIN user u ON l.userid = u.userid 
          GROUP BY 
            c.category
          ORDER BY 
            c.category;`
            const result = await this.sequelize.query(sql)
            console.log('repo::::',result)
            return result

        }catch(e){
            throw new Error(e)
        }
    }
}

module.exports = AdminRepository
