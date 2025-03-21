"use client"

import { Trophy, CheckCircle2, XCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter, Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function QuizResult({ result, hideStartNew = false, onStartNew }) {
  if (!result) return null

  // Determine score color based on percentage
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <Card className="mx-auto max-w-2xl shadow-lg border-t-4 border-t-primary">
      <div className="p-6 rounded-t-lg">
        <h1 className="flex items-center gap-3 text-3xl font-bold text-primary">
          <Trophy className="h-8 w-8 text-yellow-500" />
          Quiz Results
        </h1>
      </div>

      <CardContent className="space-y-8 p-6">
        {/* Score Overview */}
        <motion.div
          className="text-center space-y-4 p-6 rounded-xl shadow-sm border"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className={cn("text-4xl font-bold", getScoreColor(result.quizScore))}>{result.quizScore.toFixed(1)}%</h3>
          <Progress
            value={result.quizScore}
            className="w-full h-3 rounded-full"
            indicatorClassName={cn(
              "transition-all duration-1000",
              result.quizScore >= 80 ? "bg-green-500" : result.quizScore >= 60 ? "bg-yellow-500" : "bg-red-500",
            )}
          />
          <p className="text-muted-foreground mt-2">
            {result.quizScore >= 80 ? "Excellent work!" : result.quizScore >= 60 ? "Good effort!" : "Keep practicing!"}
          </p>
        </motion.div>

        {/* Improvement Tip */}
        {result.improvementTip && (
          <motion.div
            className="p-5 rounded-xl border border-primary/20 flex gap-4"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Info className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-primary mb-1">Improvement Tip</p>
              <p className="text-muted-foreground text-sm">{result.improvementTip}</p>
            </div>
          </motion.div>
        )}

        {/* Questions Review */}
        <div className="space-y-5">
          <h3 className="font-semibold text-lg flex items-center gap-2 pb-2 border-b">
            Question Review
            <span className="text-sm font-normal text-muted-foreground ml-auto">
              {result.questions.filter((q) => q.isCorrect).length} of {result.questions.length} correct
            </span>
          </h3>

          <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
            {result.questions.map((q, index) => (
              <motion.div
                key={index}
                variants={item}
                className={cn(
                  "border rounded-xl p-5 space-y-3 transition-all",
                  "border-green-500/30" // Always green border regardless of correct/incorrect
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-medium">{q.question}</p>
                  {q.isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  )}
                </div>

                <div className="grid gap-1 text-sm">
                  <div
                    className="p-2 rounded-md border border-green-500/30 text-green-500"
                  >
                    <span className="font-medium text-green-500">
                      Your answer:{" "}
                    </span>
                    {q.userAnswer}
                  </div>

                  {!q.isCorrect && (
                    <div className="p-2 rounded-md border border-blue-500/30 text-blue-500">
                      <span className="font-medium text-blue-500">Correct answer: </span>
                      {q.answer}
                    </div>
                  )}
                </div>

                <div className="text-sm p-3 rounded-md border">
                  <p className="font-medium mb-1">Explanation:</p>
                  <p className="text-muted-foreground">{q.explanation}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </CardContent>

      {!hideStartNew && (
        <CardFooter className="p-6 pt-0">
          <Button
            onClick={onStartNew}
            className="w-full py-6 text-base font-medium transition-all hover:shadow-md"
            size="lg"
          >
            Start New Quiz
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
