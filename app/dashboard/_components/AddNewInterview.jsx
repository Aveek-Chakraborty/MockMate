"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModel'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'



const AddNewInterview = () => {

    const [jobPosition, setJobPosition] = useState()
    const [jobDesc, setJobDesc] = useState()
    const [jobExperience, setJobExperience] = useState()
    const [loading, setLoading] = useState(false)
    const [jsonResponse, setJsonResponse] = useState([])
    const { user } = useUser()
    const router = useRouter()

    const onSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        const inputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. depending on this, please give me ${process.env.NEXT_PUBLIC_IQC} interview question with answers in Json format. Give questions and answers as fields in Json. Make sure that that the json is valid and correctly generated without any error at all.`

        const result = await chatSession.sendMessage(inputPrompt);
        const rawResponse = result.response.text();

        const MockJsonResponse = rawResponse.replace('```json', '').replace('```', '');

        try {
            // const parsedResponse = JSON.parse(MockJsonResponse);
            // console.log(parsedResponse);
            setJsonResponse(MockJsonResponse)

            if (MockJsonResponse) {
                const resp = await db.insert(MockInterview).values({
                    mockId: uuidv4(),
                    jsonMockResp: MockJsonResponse,
                    jobPosition: jobPosition,
                    jobDesc: jobDesc,
                    jobExperience: jobExperience,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD-MM-YYYY')
                }).returning({ mockId: MockInterview.mockId })

                if(resp) {
                    router.push(`/dashboard/interview/${resp[0]?.mockId}`)
                }

                
            }
            else {
                console.log("No response from AI");
            }
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }

        setLoading(false);
    }

    return (
        <div>

            <Dialog>
                <DialogTrigger >
                    <div className=' px-36 py-14 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'>
                        <h2 className="text-lg text-center">+ Add New</h2>
                    </div>
                </DialogTrigger>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle><h2 className='text-2xl'>Tell us more about your Job Interview</h2></DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2>Add details about your Job position/role, Job description and Years of Experience</h2>
                                    <div className='mt-7 my-3 mb-5'>
                                        <label><h4 className='text-black mb-1 font-semibold'>Job Role/Job Position</h4></label>
                                        <Input placeholder="eg: Full Stack Developer" required onChange={(e) => setJobPosition(e.target.value)} />
                                    </div>
                                    <div className='my-3 mb-5'>
                                        <label><h4 className='text-black mb-1 font-semibold'>Job Description/Tech Stack</h4></label>
                                        <Textarea placeholder="eg: React, Node.js, MongoDB, Express, Typescript, etc" required onChange={(e) => setJobDesc(e.target.value)} />
                                    </div>
                                    <div className='my-3 mb-5'>
                                        <label><h4 className='text-black mb-1 font-semibold'>Years of Experience</h4></label>
                                        <Input placeholder="eg: 2" type="number" min="0" max="60" required onChange={(e) => setJobExperience(e.target.value)} />
                                    </div>
                                </div>
                                <div className='flex gap-5 justify-end mt-5'>
                                    <Button type='submit' disabled={loading}>
                                        {loading ? <><LoaderCircle className=' animate-spin mr-3' />Generating</> : "Start Interview"}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddNewInterview
