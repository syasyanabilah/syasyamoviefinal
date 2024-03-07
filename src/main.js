const { app, BrowserWindow } = require('electron');
const fs = require('fs')
const path = require('path')
var btnCreate = document.getElementById('btnCreate')
var fileName = document.getElementById('fileName')
var fileContents = document.getElementById('fileContents')
let pathName = path.join(__dirname, 'Files')

btnCreate.addEventListener('click', function(){  //creating text file when user click CREATE button
   let file = path.join(pathName, fileName.value+".txt")
   let contents = fileContents.value
   fs.writeFile(file, contents, function(err){ //textfile that want to write
    if(err){
       return console.log(err)
    }
    console.log("The file was created")    
   })
  
 })
function save(fname){
  let file = path.join(pathName, fname.target.id+".txt")
  let contents = document.getElementById("text"+(fname.target.id))
  contents = contents.value
  console.log(contents.value)
  console.log(contents)
  console.log("text"+(fname.target.id))
  fs.writeFile(file, contents, function(err){ 
   if(err){
      return console.log(err)
   }
   console.log("The file was saved")    
   var opentext = document.getElementById("bot"+fname.target.id)
    opentext.style.height = "0"
  })
}
function viweupdate(fname){  //read contents text file
  let file = path.join(pathName, fname.target.id+".txt")
  console.log(fname.target.id)
  fs.readFile(file, function(err, data){ 
    if(err){
      return console.log(err)
    }
    var opentext = document.getElementById("bot"+fname.target.id)
    opentext.style.height = "400px"
    console.log(opentext, fname.target.id)
    var text = document.getElementById("text"+fname.target.value)
    console.log(text)
    text.value = data
    console.log(data)
    console.log("The file was read!")
  })
}
function deletes(fname){  //delete content
  let file = path.join(pathName, fname.target.value+".txt")
  var r = document.getElementById((fname.target.id))
  console.log(r)
  
  fs.unlink(file, function(err){ 
    if(err){
      return console.log(err)
    }
    console.log("The file was deleted!")
  })
  r.remove()
}