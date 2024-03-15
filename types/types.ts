import {  Conversation, Message, User } from "@prisma/client";
export interface Billboard{
    id:string;
    label:string;
    imageUrl:string;
}

export interface Category{
    id:string;
    name:string;
    billboard:Billboard
}

export interface Product{
    id:string,
    category:Category,
    name:string,
    price:string,
    isFeatured:boolean,
    size:Size,
    color:Color,
    images:Image[],
}

export interface Image{
    id:string,
    url:string
}
export interface StoreData{
    id:string,
    BillboardId:string,
    url:string,
    latitude:Number,
    longitude:number,
    distance:number,
}

export interface Size{
    id:string,
    name:string,
    value:string,
}
export interface Color{
    id:string,
    name:string,
    value:string,
}


export type FullMessageType = Message & {
  sender: User, 
  seen: User[]
};

export type FullConversationType = Conversation & { 
  users: User[]; 
  messages: FullMessageType[]
};