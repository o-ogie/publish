class AdminController {
    constructor({adminService}){
        this.adminService = adminService
    }

    async getAll(req, res, next){
        try {
          // if (!req.headers.authorization) throw new Error("No Authorization");
          const [type, token] = req.headers.cookie.split("=");
          // if (type.toLowerCase() !== "bearer")
          //   throw new Error("Authorization Type Error");
    
          const response = await this.adminService.All(token);
          res.json(response);
        } catch (e) {
          next(e);
        }
    }

    async getTotal(req,res,next){
        try{
            const response = await this.adminService.Total()
            res.json(response)
        }catch(e){
            next(e)
        }
    }

    async getHashrank(req,res,next){
        try{
            const response = await this.adminService.hashRank()
            // console.log('res::::',response)
            res.json(response)
        }catch(e){
            next(e)
        }
    }

    async dayList(req,res,next){
        try{
            const response = await this.adminService.boards()
            res.json(response)
        }catch(e){
            next(e)
        }
    }

    async timeList(req,res,next){
        try{
            const response = await this.adminService.timeBoard()
            console.log('crtl::::',response)
            res.json(response)
        }catch(e){
            next(e)
        }
    }

    async categoryGenderLike(req,res,next){
        try{
            const response = await this.adminService.genderLike()
            res.json(response)
        }catch(e){

        }
    }
}

module.exports = AdminController

