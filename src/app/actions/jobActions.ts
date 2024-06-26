'use server';
import {ConnectDatabase} from "@/database/db"
import { JobModel } from "@/models/Job";
import { revalidatePath } from "next/cache";

export async function saveJobAction(formData:FormData){
    await ConnectDatabase();
    const {id,...jobData}=Object.fromEntries(formData);
    const jobDoc=(id)?await JobModel.findByIdAndUpdate(id,jobData)
    :await JobModel.create(jobData);
    if('orgId' in jobData){
        revalidatePath('/jobs/'+jobData?.orgId);
    }
    return JSON.parse(JSON.stringify(jobDoc));

}