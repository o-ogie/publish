const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

app.set('view','html')
nunjucks.configure('views',{
    express:app
})
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.get('/',(req,res)=>{
    res.render('socket.html')
})

app.listen(3005,()=>{
    console.log('FE SERVER START')
})