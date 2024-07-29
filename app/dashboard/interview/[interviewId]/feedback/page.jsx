"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'


const page = ({ params }) => {

  const [feedbackList, setFeedbackList] = useState([])

  useEffect(() => {
    GetFeedback()
  }, [])

  const GetFeedback = async () => {
    const result = await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef, params.interviewId)).orderBy(UserAnswer.id)
    console.log(result)
    setFeedbackList(result)
  }
  return (
    <div className='p-10 m-10'>


      {feedbackList?.length == 0 ?
        <h2 className='font-bold text-xl text-gray-500 my-10'>No Interview Feedback Record found</h2>
        :
        <>
          <h2 className='text-3xl font-bold text-green-500'>Congratulations!!</h2>
          <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
          <h2 className='text-gray-500 text-sm mt-9'>Find below the questions asked along with their correct answer and your answer for comparison. Checkout the feedback for improvement</h2>

          {feedbackList && feedbackList.map((item, index) => (
            <Collapsible key={index}>
              <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-5 text-left flex justify-between gap-2 items-center w-full'>{item.question} <ChevronsUpDown />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className='flex flex-col gap-2'>
                  <h2 className='text-yellow-900 bg-yellow-50 p-2 rounded-lg border'><strong>Rating: </strong>{item.rating}</h2>
                  <h2 className=' bg-red-50 text-red-900 p-2 rounded-lg border'><strong>Your Answer: </strong>{item.userAns}</h2>
                  <h2 className=' bg-green-50 text-green-900 p-2 rounded-lg border'><strong>Correct Answer: </strong>{item.correctAns}</h2>
                  <h2 className=' bg-blue-50 text-blue-900 p-2 rounded-lg border'><strong>Feedback: </strong>{item.feedback}</h2>
                </div>
              </CollapsibleContent>
            </Collapsible>

          ))}

        </>

      }

      <Link href={'/dashboard'}>
        <Button className='mt-5'>Go to Dashboard</Button>
      </Link>


    </div>
  )
}

export default page
