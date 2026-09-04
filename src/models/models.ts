import { readFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { Customerror } from '../types/types.js'

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)
const DATAPATH=path.join(__dirname,'../data/data.json')


export const readData=async ()=>{
    let data=await readFile(DATAPATH,'utf8')

    if(!data) throw new Customerror('Cant get data from data.json',400)

    return JSON.parse(data)
}


