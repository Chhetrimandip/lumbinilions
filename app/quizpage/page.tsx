// export const dynamic = 'force-dynamic';
import React from 'react'
import QuizCard from '../components/quizcard'
import { prisma } from '@/lib/db'  // Use the singleton import
import { QuizQuestion } from '@/lib/types';

const QuizPage = async () => {
    const leaderboard = await prisma.fan.findMany({
            orderBy: {
                score: 'desc',
            },
            take: 10,
        });
  let quizQuestions: QuizQuestion[] = [];
  
  // Define fallback data - putting this at the beginning so we have it no matter what
  const fallbackQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "Which country won the ICC Men's Cricket World Cup 2023?",
      options: ["India", "Australia", "England", "New Zealand"],
      correctanswer: 1,
      answerimage: "qa1.webp", 
      answertext: "Australia defeated India in the final to win their 6th World Cup title, making them the most successful team in World Cup history."
    },
    // ... include all your other fallback questions
  ];
  
  try {
    console.log("Starting to fetch quiz questions");
    
    // Use quiz (lowercase) instead of quizzy

    const dbQuestions = await prisma.quizzy.findMany();

    const shuffledQuestions = dbQuestions
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);
    console.log(`Found ${dbQuestions.length} questions in database`);
    
    if (dbQuestions && dbQuestions.length > 0) {
      // No mapping needed if your schema and component both use lowercase
      quizQuestions = shuffledQuestions;
      console.log("Got database questions successfully");
    } else {
      console.log("No database questions found, using fallback");
      quizQuestions = fallbackQuestions;
    }
  } catch (error) {
    console.log("Error fetching quiz questions:", error);
    console.log("Using fallback questions due to error");
    quizQuestions = fallbackQuestions;
  }
  
  console.log(`Final quiz questions array length: ${quizQuestions.length}`);
  if (quizQuestions.length > 0) {
    console.log(`First question: ${quizQuestions[0].question}`);
  }
  
  return (
    <QuizCard questions={quizQuestions} leaderboard = {leaderboard} />
  );
};

export default QuizPage;