import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

const QuestionSection = ({ mockInterviewQuestions, activeQuestionIndex }) => {

    const textToSpeech = (text)=>{
        const msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
    }

    return mockInterviewQuestions && (
        <div className='p-5 border rounded-lg my-10 '>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {mockInterviewQuestions && mockInterviewQuestions.map((q, i) => (
                    <h2 key={i} className={` p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex == i && ` text-primary font-bold underline text-2xl`}`}>Question #{i + 1}</h2>
                ))}
            </div>
            <h2 className='my-5 text-sm md:text-lg'>{mockInterviewQuestions[activeQuestionIndex]?.question}</h2>
            <Volume2 onClick={()=>textToSpeech(mockInterviewQuestions[activeQuestionIndex]?.question)} className='cursor-pointer' />     
            <div className='p-5 rounded-lg mt-10 border-blue-300 bg-blue-100'>
                <h2 className='flex gap-2 text-blue-600'><Lightbulb /><strong>Note:</strong></h2>
                <h2 className='mt-3 text-blue-500 text-sm'>Click on Record Answer when you want to answer the question. At
                    the end of interview we will give you the feedback along with the
                    correct answer for each of question and your answer to comapre
                    it. You can record answer after you have enabled the camera.</h2>
            </div>
        </div>
    )
}

export default QuestionSection
