const express=require('express')
const rootRouter=require('./routes/index')
const cors=require('cors')


const app=express();
app.use(cors())
app.use(express.json())





app.use('/api/v1',rootRouter);


const PORT=process.env.PORT || 7000

app.listen(PORT,()=>{
    console.log(`server is listening on ${PORT}`);
})


