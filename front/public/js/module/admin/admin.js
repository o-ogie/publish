import request from "/js/lib/request.js"


const response = request.get('/users/all')

const userList = document.querySelector("#userList")
const li = document.createElement('li')
const span = document.createElement('span')
const updateBtn = document.createElement('button')
console.log(1)