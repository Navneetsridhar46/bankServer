const mongoose=require('mongoose')


mongoose.connect(process.env.BASE_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log('_______Mongodb Atlas connected_____');
}).catch(()=>{
    console.log("_____Mdb Atlas not connected");
})