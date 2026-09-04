import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { ErrorRequestHandler } from 'express'
import type { Resapi } from './interfaces/interfaces.js'
import { cpRouter } from './routes/index.js'


const PORT=process.env.PORT || 3300
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)
const PUBLICPATH=path.join(__dirname,'../public')

const app=express()


app.use(cors({
    origin:['http://localhost:5173','https://budgetcalculator-three.vercel.app'],
    methods:['GET','POST'],
    credentials:true
}))
app.use(express.static(PUBLICPATH))
app.use(express.json())

app.use('/api',cpRouter)

const Errormanage:ErrorRequestHandler=(err,_req,res,_next)=>{
    let message=err.message || 'General Error'
    let code:number;
    if(err.code === 'ENOENT'){
        code=500
    }else{
        code = typeof err.code === 'number' ? err.code : 500
    }
    let resp:Resapi={
        success:false,
        message,
        data:null
    }

    res.status(code).json(resp)
}

app.use(Errormanage)

app.listen(PORT,()=>{
    console.log(`server ready at http://127.0.0.1:${PORT}`)
})