const fs = require('fs');
const http = require('http');
const url = require('url');

//////////////////////////////////////////////////////////////////////////////////
///// FILES
//Blocking , Synchronus Way
// const textIn = fs.readFileSync(`./txt/input.txt`,`utf-8`)
// console.log(textIn)

// const textOut = `This is what we know about avocade : ${textIn}. \n Created on ${Date.now()}`

// fs.writeFileSync(`./txt/output.txt`,textOut);
// console.log(`File Written`);

//Non Blocking, Asycnrhonus Way 
// fs.readFile(`./txt/start.txt`, 'utf-8' , (err,data1)=>{
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8' , (err,data2)=>{
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8' , (err,data3)=>{
//             console.log(data3);

//             fs.writeFile('.txt/final.txt', `${data2}\n${data3}`,'utf-8',err =>{
//                 console.log("Your File Has Been Written")
//             })
//         })
//     })
// })

// console.log('Will Read File')

////////////////////////////////////////////////////////////////////////////////
//// SERVER
const server = http.createServer((req,res) => {

    //request url disimpan dlm bentuk variable
    const pathName = req.url 

    if(pathName === '/' || pathName === '/overview'){
        res.end(`This is Overview`)
    } else if (pathName === '/products') {
        res.end('This is product')
    } else if (pathName === '/api'){
        //__dirname merupakan tempat lokasi data nya 
        fs.readFile(`${__dirname}/dev-data/data.json`,'utf-8', (err,data)=> {
            const productData = JSON.parse(data)
            res.writeHead(200,{'Content-type':'application/json'})
            res.end(data)
        })
    } 
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header' : 'hello-world'
        })
        res.end('<h1>Page Not Found! </h1>')
    }
    res.end("Hello from server")
})

//menjalankan diport localhost
server.listen(8000,'127.0.0.1' , () => {
    console.log(`Listening to request on port 8000`)
})