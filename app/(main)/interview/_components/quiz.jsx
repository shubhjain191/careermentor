"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { generateQuiz, saveQuizResult } from "@/actions/interview"
import QuizResult from "./quiz-result"
import useFetch from "@/hooks/use-fetch"
import { CheckCircle, ChevronRight, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showExplanation, setShowExplanation] = useState(false)

  const { loading: generatingQuiz, fn: generateQuizFn, data: quizData } = useFetch(generateQuiz)

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult)

  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null))
    }
  }, [quizData])

  const handleAnswer = (answer) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowExplanation(false)
    } else {
      finishQuiz()
    }
  }

  const calculateScore = () => {
    let correct = 0
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct++
      }
    })
    return (correct / quizData.length) * 100
  }

  const finishQuiz = async () => {
    const score = calculateScore()
    try {
      await saveQuizResultFn(quizData, answers, score)
      toast.success("Quiz completed!")
    } catch (error) {
      toast.error(error.message || "Failed to save quiz results")
    }
  }

  const startNewQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowExplanation(false)
    generateQuizFn()
    setResultData(null)
  }

  if (generatingQuiz) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] w-full p-6 rounded-lg border border-border/30 bg-card/50 backdrop-blur-sm">
        <div className="w-16 h-1 bg-primary/20 rounded-full overflow-hidden relative mb-4">
          <div className="absolute inset-0 bg-primary animate-pulse"></div>
        </div>
        <p className="text-muted-foreground text-sm font-medium">Generating your quiz...</p>
      </div>
    )
  }

  // Show results if quiz is completed
  if (resultData) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4">
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    )
  }

  if (!quizData) {
    return (
      <Card className="w-full max-w-3xl mx-auto shadow-md border-border/40 overflow-hidden">
        <CardHeader className="pb-4 bg-gradient-to-r from-background to-muted/30">
          <CardTitle className="text-2xl font-bold">Ready to test your knowledge?</CardTitle>
          <CardDescription>Challenge yourself with industry-specific questions</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <p className="text-muted-foreground">
              This quiz contains 10 questions specific to your industry and skills. Take your time and choose the best
              answer for each question.
            </p>
            <div className="grid grid-cols-3 gap-4 py-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <span className="text-sm font-medium text-primary">{i}</span>
                  </div>
                  <span className="text-xs text-muted-foreground text-center">
                    {i === 1 ? "Answer Questions" : i === 2 ? "Review Explanations" : "See Results"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2 pb-6">
          <Button onClick={generateQuizFn} className="w-full py-6 text-base font-medium transition-all hover:shadow-md">
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    )
  }

  const question = quizData[currentQuestion]
  const progress = ((currentQuestion + 1) / quizData.length) * 100

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-md border-border/40">
      <CardHeader className="pb-2 relative">
        <div className="absolute top-0 left-0 h-1 bg-muted w-full">
          <div
            className="h-full bg-primary transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">
            Question {currentQuestion + 1} of {quizData.length}
          </CardTitle>
          <span className="text-sm font-medium text-muted-foreground">{progress.toFixed(0)}% Complete</span>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <p className="text-lg font-medium leading-relaxed">{question.question}</p>
        <RadioGroup onValueChange={handleAnswer} value={answers[currentQuestion]} className="space-y-3">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center space-x-3 p-4 rounded-lg border-2 transition-all duration-200",
                answers[currentQuestion] === option
                  ? "border-primary/70 bg-primary/5"
                  : "border-border hover:border-border/80 hover:bg-muted/30",
              )}
              onClick={() => handleAnswer(option)}
            >
              <RadioGroupItem
                value={option}
                id={`option-${index}`}
                className="data-[state=checked]:border-primary data-[state=checked]:text-primary"
              />
              <Label
                htmlFor={`option-${index}`}
                className={cn(
                  "w-full cursor-pointer text-base",
                  answers[currentQuestion] === option ? "font-medium" : "",
                )}
              >
                {option}
              </Label>
              {answers[currentQuestion] === option && <CheckCircle className="h-5 w-5 text-primary shrink-0" />}
            </div>
          ))}
        </RadioGroup>

        {showExplanation && (
          <div className="mt-6 p-5 bg-muted/50 rounded-lg border border-border/50 animate-in fade-in duration-300">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-base mb-1">Explanation:</p>
                <p className="text-muted-foreground leading-relaxed">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 pt-2 pb-6">
        {!showExplanation && (
          <Button
            onClick={() => setShowExplanation(true)}
            variant="outline"
            disabled={!answers[currentQuestion]}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            <Lightbulb className="mr-2 h-4 w-4" />
            Show Explanation
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion] || savingResult}
          className={cn("w-full sm:w-auto transition-all order-1 sm:order-2", showExplanation ? "sm:w-full" : "")}
        >
          {savingResult ? (
            <div className="flex items-center justify-center">
              <div className="h-1 w-5 bg-primary/20 rounded-full overflow-hidden relative mr-2">
                <div className="absolute inset-0 bg-background animate-pulse"></div>
              </div>
              <span>Saving...</span>
            </div>
          ) : (
            <>
              {currentQuestion < quizData.length - 1 ? (
                <>
                  Next Question
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                "Finish Quiz"
              )}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

