// const dns = require('node:dns')
// dns.setServers(['1.1.1.1', '1.0.0.1'])

const mongoose=require('mongoose')
const connection_string = process.env.DBConnectionString
console.log("running");

mongoose.connect(connection_string).then((res)=>{
    console.log("server connected to mongoDB");
    // console.log(res);
    

}).catch(err=>{
    console.log("connection failed");
    console.log(err)
    
    
})


