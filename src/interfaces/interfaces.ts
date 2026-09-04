export interface Lodging{
    type:string,
    lodging_cost:number,
    lodgingUrl:string
}

export interface Activities{
    id:string,
    name:string,
    price:number
}

export interface Destination{
    id:string,
    name:string,
    country:string,
    city:string,
    feeding_cost:number,
    imageUrl:string
    lodging:Lodging[],
    activities:Activities[]
}

export interface Breakdown{
    name:string,
    value:number
}

export interface Calculation{
    total:number,
    destination:string,
    cost_person:number,
    max_budget:number,
    difference:number,
    persons:number,
    breakdown:Breakdown[],
    status:string,
    days:number
}

export interface Resapi{
    success:boolean,
    message:string,
    data:Destination[] | Calculation | null | Destination
}