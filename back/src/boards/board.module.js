const {
    sequelize: {
      models: { User, Board, Comment, Liked ,Hash, Hashtag },
    },
    sequelize,
  } = require("../../models/index");
  
  const BoardRepository = require("./board.repository");
  const BoardService = require("./board.service");
  const BoardController = require("./board.controller");
  const config = require("../../config");
  
  const repository = new BoardRepository({ User, Board, Comment, Liked ,Hash, Hashtag, sequelize });
  const service = new BoardService({ boardRepository: repository, config });
  const controller = new BoardController({ boardService: service });
  

// repository.findAll().then(v=>console.log(v))
// repository.create({userid:"web7722", content:"hello world"}).then(v=>console.log(v))
// repository.update({id:3,content:"수정 테스트"}).then(v=>console.log(v))
// service.putComment({id:4,content:"수정 테스트"}).then(v=>console.log(v))
// repository.destroy(5).then(v=>console.log(v))

module.exports = {
    repository,
    service,
    controller,
  };