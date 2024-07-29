import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function Component() {
  return (
    <section className="w-full py-20 md:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">How it Works?</h2>
          <p className="text-muted-foreground text-lg md:text-xl">
            Discover the power of AI-driven interviews with our seamless process.
          </p>
        </div>
        <div className="grid gap-8 mt-12 md:mt-20">
          <div className="relative group">
            <div className="after:absolute after:inset-y-0 after:w-px after:bg-muted-foreground/20 relative pl-6 after:left-0 grid gap-10">
              <div className="grid gap-1 text-sm relative">
                <div className="aspect-square w-3 bg-primary rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
                <div className="font-medium">
                  <Card className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <CardTitle>Add New Interview</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      Start the process by creating a new interview session with just a single click.
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="grid gap-1 text-sm relative">
                <div className="aspect-square w-3 bg-primary rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
                <div className="font-medium">
                  <Card className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <CardTitle>Enter Job Details</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      Provide the job details, including the position, requirements, and years of experience.
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="grid gap-1 text-sm relative">
                <div className="aspect-square w-3 bg-primary rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
                <div className="font-medium">
                  <Card className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <CardTitle>Start the Interview</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      Ensure your camera is working properly before the interview begins.
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="after:absolute after:inset-y-0 after:w-px after:bg-muted-foreground/20 relative pl-6 after:left-0 grid gap-10">
              <div className="grid gap-1 text-sm relative">
                <div className="aspect-square w-3 bg-primary rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
                <div className="font-medium">
                  <Card className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <CardTitle>Answer Questions</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      Respond to the interview questions with confidence, showcasing your skills and experience. Dont forget to recored them.
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="grid gap-1 text-sm relative">
                <div className="aspect-square w-3 bg-primary rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
                <div className="font-medium">
                  <Card className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <CardTitle>Review Results</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      Analyze the interview results, including your performance and feedback, to improve for future
                      interviews.
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


