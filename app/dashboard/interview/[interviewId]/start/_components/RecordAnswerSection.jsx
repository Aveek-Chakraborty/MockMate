"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { chatSession } from '@/utils/GeminiAIModel'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { is } from 'drizzle-orm'
import { Mic, WebcamIcon } from 'lucide-react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text'
import Webcam from 'react-webcam'
import { toast } from 'sonner'

const RecordAnswerSection = ({ mockInterviewQuestions, activeQuestionIndex, interviewData }) => {
    const [webcamEnabled, setWebcamEnabled] = useState(false)
    const { user } = useUser()
    const [userAnswer, setUserAnswer] = useState('')
    const [loading, setLoading] = useState(false)
    const {
        error,
        interimResult,
        isRecording,
        results,
        setResults,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {
        results.map((result) => (setUserAnswer(prevAns => prevAns + result?.transcript)))
    }, [results]);

    useEffect(() => {
        if(!isRecording && userAnswer?.length > 5) {
            UpdateUserAnswer()
        }

    }, [userAnswer]);

    const StartStopRecording = async () => {
        if (isRecording) {
            stopSpeechToText()
        } else {
            startSpeechToText()
        }
    }

    const UpdateUserAnswer = async () => {
        setLoading(true)
        const feedbackPrompt = "Question:" + mockInterviewQuestions[activeQuestionIndex]?.question + ", User Answer:" + userAnswer + ", Depending on user answer and the question, provide rating for answer on a scale of 0 to 10 and give us feedback as area of improvement in just 2 to three lines. Give the output in JSON format with rating and feedback as fields. Note that the json format should be valid and without any errors. "

        const result = await chatSession.sendMessage(feedbackPrompt)

        const MockJsonResp = (result.response.text()).replace('```json', '').replace('```', '')
        const jsonFeedbackResp = JSON.parse(MockJsonResp)

        const resp = await db.insert(UserAnswer).values({
            mockIdRef: interviewData?.mockId,
            question: mockInterviewQuestions[activeQuestionIndex]?.question,
            correctAns: mockInterviewQuestions[activeQuestionIndex]?.answer,
            userAns: userAnswer,
            feedback: jsonFeedbackResp?.feedback,
            rating: jsonFeedbackResp?.rating,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MMM-YYYY')
        })

        if (resp) {
            toast('Answer recoreded Successfully')
            setUserAnswer('')
            setResults([])
        } 
        
        setLoading(false)
    }




    if (error) return <p className='text-3xl m-96'>Application is not supported for this browser 🤷‍. Try using Chrome</p>;
    return (
        <div className='p-5 border rounded-lg my-10 w-[630px]'>
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
                {!webcamEnabled ? <Button variant="outline" className='w-full' onClick={() => { setWebcamEnabled(true) }}>Enable Camera and Microphone</Button>
                    :
                    <Button disabled={loading} className='w-full mt-7' onClick={StartStopRecording}>
                        {isRecording ?
                            <h2 className='flex gap-2'>
                                <Mic /> 'Recording... (Click to stop)'
                            </h2> :
                            'Record Answer'}
                    </Button>}

            </div>

            



        </div>
    )
}

export default RecordAnswerSection
