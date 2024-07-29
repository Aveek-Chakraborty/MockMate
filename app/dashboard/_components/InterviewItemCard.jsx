import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const InterviewItemCard = ({ interview }) => {
  const router = useRouter()
  const onStart = () => {
    router.push('/dashboard/interview/' + interview?.mockId)
  }

  const onFeedback = () => {
    router.push('/dashboard/interview/' + interview?.mockId + "/feedback")
  }

  const onDelete = async () => {
    const resp = await db.delete(MockInterview).where(eq(MockInterview.mockId, interview?.mockId)).returning();
    console.log(resp)

    if (resp) {
      window.location.reload()
    }
  }

  return (
    <div className='border border-gray-300 shadow-sm rounded-lg p-3'>
      <div className='flex justify-between gap-3'>
        <div>
          <h2 className='font-bold text-violet-900 mb-3'>{interview?.jobPosition}</h2>
          <h2 className='text-sm text-gray-600'>{interview?.jobExperience} Years of Experience</h2>
          <h2 className='text-xs text-gray-400 mb-4'>created on: {interview?.createdAt}</h2>
        </div>
        <Button size="sm" className="bg-red-700" onClick={onDelete}><Trash2 /></Button>

      </div>

      <div className='flex justify-between gap-3 mt-3'>
        <Button size="sm" variant="outline" onClick={onFeedback}>Feedback</Button>
        <Button size="sm" onClick={onStart}>Start</Button>

      </div>
    </div>
  )
}

export default InterviewItemCard
