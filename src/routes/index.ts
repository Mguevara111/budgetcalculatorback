import express from 'express'
import { getdestinations,getdestinationsid,postcalculate } from '../controllers/controllers.js'

export const cpRouter=express.Router()

cpRouter.get('/destinations',getdestinations)
cpRouter.get('/destinations/:id',getdestinationsid)
cpRouter.post('/budget/calculate',postcalculate)