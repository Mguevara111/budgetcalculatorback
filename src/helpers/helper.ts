import type { Activities, Destination } from "../interfaces/interfaces.js"
import type { Breakdown } from "../interfaces/interfaces.js";
// export interface Calculation{
//     total:number,
//     destination:string,
//     cost_person:number,
//     max_budget:number,
//     diference:number,
//     persons:number,
//     breakdown:Breakdown[]
// }

const activitiestotal=(activities:string[],da:Activities[])=>{
    let activitiestotal=0;
    for (let ac of activities){
        const activitiesselected=da.find(el=>el.id === ac)
        if(!activitiesselected){
            continue
        }
        activitiestotal+=activitiesselected.price
    }
    return activitiestotal
    
}

export const calculatehelper=(destination:Destination,days:number,people:number,activities:string[],maximun_budget:number,cost:number)=>{
    //let subtotal=0
    let total=0
    let diference=0
    let status=''
    let subtotalwitoutact:number=0
    let activititotal=activitiestotal(activities,destination.activities)
    let breakdown:Breakdown[]=[]

    //subtotal=destination.feeding_cost+cost+activititotal
    subtotalwitoutact=destination.feeding_cost+cost
    total=(activititotal*people)+((subtotalwitoutact*people)*days)

    
    let cost_person=(activititotal)+(subtotalwitoutact * days)

   
    diference=maximun_budget - total
    
    

    if(total < maximun_budget*0.9){
        status='GREEN'
    }else if(total >= maximun_budget*0.9 && total <=maximun_budget){
        status='YELLOW'
    }else if(total > maximun_budget){
        status='RED'
    }

    breakdown=[...breakdown,{name:'Feeding cost',value:destination.feeding_cost},
        {name:'Cost per person',value:cost_person},
        {name:'Maximun_budget',value:maximun_budget},
        {name:'Lodging cost',value:cost},
        {name:'Difference',value:diference},
        {name:'Quantity people',value:people},
        {name:'Quantity days',value:days},
        {name:'Activities cost',value:activititotal},
        {name:'Total',value:total}
    ]

    return {
        total,
        status,
        cost_person,
        diference,
        breakdown
    }
    
}


