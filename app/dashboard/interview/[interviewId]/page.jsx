"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

const Interview = ({ params }) => {

    const [interviewData, setInterviewData] = useState({})
    const [webcamEnabled, setWebcamEnabled] = useState(false)

    useEffect(() => {
        GetInterviewDetails()
    }, [])

    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId))
        setInterviewData(result[0])
    }

    return (
        <div className='my-10 px-40'>
            <h2 className='font-bold text-2xl'>Let's Get Started</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-14">


                <div className='flex flex-col my-5 gap-5 mt-7'>
                    <div className='flex flex-col p-5 rounded-lg border'>
                        <h2 className='text-lg'><strong>Job Role/Job Position:</strong>{interviewData.jobPosition}</h2>
                        <h2 className='text-lg'><strong>Job Description/Tech Stack:</strong>{interviewData.jobDesc}</h2>
                        <h2 className='text-lg'><strong>Years of Experience:</strong>{interviewData.jobExperience}</h2>
                    </div>
                    <div className='p-5 rounded-lg border-yellow-300 bg-yellow-100'>
                        <h2 className='flex gap-2 text-yellow-600'><Lightbulb /><strong>Information</strong></h2>
                        <h2 className='mt-3 text-yellow-500'>Enable Video Web Cam and Microphone to Start your Al Generated MockInterview, It Has questions which you can answer and at the end you will get the report on the basis of your answer. NOTE: We never record your video.</h2>
                    </div>
                </div>


                <div>
                    {webcamEnabled ? <Webcam
                        className='mt-7'
                        onUserMedia={() => { setWebcamEnabled(true) }}
                        onUserMediaError={() => { setWebcamEnabled(false) }}
                        mirrored={true}
                        style={{
                            height: 300,
                            width: 600,

                        }} />
                        :
                        <>
                            <WebcamIcon className='h-72 my-7 w-full p-20 bg-secondary rounded-lg border' />
                            
                        </>
                        
                    }
                    {!webcamEnabled?<Button variant="outline" className='w-full' onClick={() => { setWebcamEnabled(true) }}>Check if camera is working</Button>
                             :<Button variant="outline" className='w-full mt-7' onClick={() => { setWebcamEnabled(false) }}>Close camera</Button>}

                </div>


            </div>

            <div className="flex justify-end items-end">
                <Link href={`/dashboard/interview/${params.interviewId}/start`}><Button className='mt-8' onClick={() => {}}>Start Interview</Button></Link>
            </div>

        </div>
    )
}

export default Interview
