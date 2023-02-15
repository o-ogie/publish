class AdminService{

    constructor({adminRepository,}){
        this.adminRepository = adminRepository
    }


    async All(token){
        const list = await this.adminRepository.getUsers();
        return list;
    }

    async Total(){
        try{
            const [[total]] = await this.adminRepository.hitLike_count()
            return total
        }catch(e){
            throw new this.BadRequest(e)
        }
    }

    async hashRank(){
        try{
            const [rank] = await this.adminRepository.hash()
            return rank
        }catch(e){
            throw new this.BadRequest(e)
        }
    }

    async boards() {
        try{
            const board = await this.adminRepository.eachDay()
            return board
        }catch(e){
            throw new this.BadRequest(e)
        }
    }

    async timeBoard() {
        try{
            const board = await this.adminRepository.eachTime()
            console.log('sev:::',board)
            return board
        }catch(e){
            throw new this.BadRequest(e)
        }
    }
}


module.exports = AdminService