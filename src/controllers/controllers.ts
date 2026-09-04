import { Request,Response,NextFunction } from "express";
import { readData } from "../models/models.js";
import type { Resapi } from "../interfaces/interfaces.js";
import type { Destination } from "../interfaces/interfaces.js";
import { Customerror } from "../types/types.js";
import type { Calculation } from "../interfaces/interfaces.js";
import { calculatehelper } from "../helpers/helper.js";



export const getdestinations=async (_req:Request,res:Response,next:NextFunction)=>{
    try {
        let data=await readData()

        let resp:Resapi={
            success:true,
            message:'Success reading data',
            data
        }

        res.status(200).json(resp)
    } catch (error) {
        next(error)
    }
}

export const getdestinationsid=async (req:Request,res:Response,next:NextFunction)=>{
    try {
        let data:Destination[]=await readData()
        const {id}=req.params

        if(!id || id === 'null' || id === 'undefined'){
            let err=new Customerror('First choose a destination',400)
            throw err
        }

        const searchid=data.find(el=>el.id === id)

        if(!searchid){
            let err=new Customerror(`Destination doesnt exists`,400)
            throw err
        }

        let resp:Resapi={
                success:true,
                message:'Success reading destiny',
                data:searchid
            }
        
        res.status(200).json(resp)
    } catch (error) {
        next(error)
    }
    
}



export const postcalculate=async (req:Request,res:Response,next:NextFunction)=>{
    try {
        let data:Destination[]=await readData()
        const {destinyid,days,people,activities,maximun_budget,lodging} = req.body

        const searchdestination=data.find(el=>el.id === destinyid)

        if(!searchdestination){
            let err=new Customerror('Destination doesnt exists',400)
            throw err
        }

        const searchlodging=searchdestination.lodging.find(el=>el.type === lodging)

        if(!searchlodging){
            let err=new Customerror('Lodging doesnt exists',400)
            throw err
        }

    

        let calculate=calculatehelper(searchdestination,days,people,activities,maximun_budget,searchlodging.lodging_cost)

        let newcalculation:Calculation={
            total:calculate.total,
            destination:searchdestination.name,
            max_budget:maximun_budget,
            status:calculate.status,
            cost_person:calculate.cost_person,
            persons:people,
            difference:calculate.diference,
            breakdown:calculate.breakdown,
            days
           
        }

        let serverresp:Resapi={
            success:true,
            message:'Success sending calculation',
            data:newcalculation
        }

        res.status(200).json(serverresp)
    } catch (error) {
        next(error)
    }
}