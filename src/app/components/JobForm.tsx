'use client'
import {saveJobAction} from "@/app/actions/jobActions"
import type {Job} from '@/models/Job'
import ImageUpload from '@/app/components/ImageUpload'
import {redirect} from 'next/navigation'
import {useState} from 'react'
import {Button,RadioGroup,TextArea,TextField,Theme} from '@radix-ui/themes'
import {faEnvelope,faMobile,faPhone,faStar,faUser} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import "react-country-state-city/dist/react-country-state-city.css";
import {
    CitySelect,
    CountrySelect,
    StateSelect,
} from "react-country-state-city";

export default function JonForm({orgId,jobDoc}:{orgId:string;jobDoc?:Job}){
    const [countryId,setCountryId]=useState(jobDoc?.countryId||0);
    const [stateId,setStateId]=useState(jobDoc?.stateId||0);
    const [cityId,setCityId]=useState(jobDoc?.cityId||0);
    const [countryName,setCountryName]=useState(jobDoc?.country||'');
    const [cityName,setCityName]=useState(jobDoc?.city||'');
    const [stateName,setStateName]=useState(jobDoc?.state||'');

    async function handleSaveJob(data:FormData){
        data.set('country',countryName.toString());
        data.set('state',stateName.toString());
        data.set('city',cityName.toString());
        data.set('countryId',countryId.toString());
        data.set('stateId',stateId.toString());
        data.set('cityId',cityId.toString());
        data.set('orgId',orgId);
        // parse action here
        const jobDoc=await saveJobAction(data);
        redirect(`/jobs/${jobDoc.orgId}`);
        }

    return(
        <Theme>
            <form action={handleSaveJob} className="container mt-6 flex flex-col gap-4">
                {jobDoc &&(
                    <input type="hidden" name="id" value={jobDoc?._id}/>
                )}
                <TextField.Root name="title" placeholder="Job title" defaultValue={jobDoc?.title || ''}/>
                <div className="grid sm:grid-cols-3 gap-6 *:grow">
                    <div>
                        Remote?
                        <RadioGroup.Root defaultValue={jobDoc?.remote||'hybrid'} name="remote">
                            <RadioGroup.Item value="onsite">On-Site</RadioGroup.Item>
                            <RadioGroup.Item value="hybrid">Hybrid-remote</RadioGroup.Item>
                            <RadioGroup.Item value="remote">Fully remote</RadioGroup.Item>
                        </RadioGroup.Root>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </form>
        </Theme>
    )

}


