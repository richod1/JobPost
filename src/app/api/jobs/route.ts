import {JobModel} from "@/models/Job"
import mongoose from "mongoose"
import {NextRequest,NextResponse} from "next/server"
import {ConnectDatabase} from '@/database/db'


export async function DELETE(req:NextRequest,res:NextResponse){
    const url=new URL(req.url);
    const id=url.searchParams.get('id');
    await ConnectDatabase()
    await JobModel.deleteOne({
        _id:id,
    });

    return Response.json(true);
    
}