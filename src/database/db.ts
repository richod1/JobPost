import mongoose from "mongoose"

export async function ConnectDatabase(){
    mongoose.connect(process.env.MONO_URI as string).then(()=>{
        console.log('database connected successfully');

    }).catch((err)=>{
        console.log(err,"dtabase failed!")
    })

}