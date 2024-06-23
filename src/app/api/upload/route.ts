import {NextRequest} from 'next/server'
import uniqid from 'uniqid'
import {PutObjectCommand,S3Client} from '@aws-sdk/client-s3';

export async function POST(req:NextRequest){
    const data=await req.formData();
    const file=data.get('file') as File;

    const s3Client=new S3Client({
        region:process.env.AWS_REGION as string,
        credentials:{
            accessKeyId:process.env.AWS_ACCESS_KEY as string,
            secretAccessKey:process.env.AWS_SECRET_KEY as string,
        }
    });

    const newFilename=`${uniqid()}-${file.name}`;

    const chunks=[];
// @ts-ignore
    for await (const chunk of file.stream()){
        chunks.push(chunk);

    }

    const buffer=Buffer.concat(chunks);

    const bucketName=process.env.AWS_BUCKET_NAME  as string;
    await s3Client.send(new PutObjectCommand({
        Bucket:bucketName,
        Key:newFilename,
        ACL:'public-read',
        Body:buffer,
        ContentType:file.type,
    }));

    return Response.json({
        newFilename,
        url:`http://${bucketName}.s3.amazonaws.com/${newFilename}`
    });
}