"use client"
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { QuizCardProps } from '@/lib/types'
import { createFan } from '../actions/action'
import Leaderboard from './leaderboard'

const QuizCard: React.FC<QuizCardProps> = ({ questions, leaderboard = [] }) => {

  // State to track if quiz has started
  const [quizStarted, setQuizStarted] = useState(false);
  // State to track current question index
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // State to track selected answer
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  // State to track score
  const [score, setScore] = useState(0);
  // State to track if quiz is completed
  const [quizCompleted, setQuizCompleted] = useState(false);
  // State to track if answer is checked
  const [answerChecked, setAnswerChecked] = useState(false);
  // State to control answer reveal animation
  const [showAnswer, setShowAnswer] = useState(false);
  // Timer state (in seconds)
  const [time, setTime] = useState(0); // 2 minutes = 120 seconds
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  
  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
    // Ensure questions array is not empty
    if (!questions || questions.length === 0) {
      return (
        <div className="min-h-screen bg-neutral-900 pt-40 pb-16 px-4 flex justify-center items-center">
          <div className="bg-neutral-800/80 backdrop-blur-sm rounded-lg shadow-lg p-6 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-['Bebas_Neue'] text-white mb-4">
              Quiz questions are loading...
            </h2>
            <p className="text-gray-300 text-base mb-8">
              Please try again in a moment
            </p>
          </div>
        </div>
      );
    }
  // Start the quiz
  const startQuiz = () => {
    setQuizStarted(true);
    // Start timer
    timerRef.current = setInterval(() => {
      setTime(prevTime => {
        if (prevTime >= 120) {
          // Time's up
          clearInterval(timerRef.current!);
          setQuizCompleted(true);
          return 0;
        }
        return prevTime + 1;
      });
    }, 1000);
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Handle option selection
  const handleOptionSelect = (optionIndex: number) => {
    if (answerChecked) return; // Prevent changing answer after checking
    setSelectedOption(optionIndex);
  };

  // Check answer
  const checkAnswer = () => {
    if (selectedOption === null) return; // Do nothing if no option selected
    
    setAnswerChecked(true);
    
    if (selectedOption === questions[currentQuestion].correctanswer) {
      setScore(score + 1);
    }
    
    // Slight delay before showing the answer explanation
    setTimeout(() => {
      setShowAnswer(true);
    }, 400);
  };

  // Go to next question
  const nextQuestion = () => {
    setShowAnswer(false);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setAnswerChecked(false);
      } else {
        // Quiz finished
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        setQuizCompleted(true);
      }
    }, 300);
  };

  // Reset quiz
  const resetQuiz = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setQuizCompleted(false);
    setAnswerChecked(false);
    setShowAnswer(false);
    setTime(0);
  };


  return (
    <div className="min-h-screen bg-[#06101B] pt-40 pb-16 px-4">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-['Bebas_Neue'] text-amber-500 mb-6 text-center">
        <span className="text-amber-500">|</span> CRICKET QUIZ
      </h1>

      {!quizStarted ? (
        // Quiz start screen
        <div className="bg-neutral-800/80 backdrop-blur-sm rounded-lg shadow-lg p-6 md:p-10 text-center animate-fade-in">
          <Image 
            src="/crickettrophy.png" 
            alt="Cricket Trophy" 
            width={128}
            height={128}
            className="w-32 h-32 mx-auto mb-6 object-contain"
          />
            <h2 className="text-2xl md:text-3xl font-['Bebas_Neue'] text-white mb-4">
              Test Your Cricket Knowledge!
            </h2>
            <p className="text-gray-300 text-base mb-8">
              10 questions • 2 minute time limit • How well do you know the game?
            </p>
            <p className="text-gray-300 text-base mb-8">
              Play the quiz and fill the form to get a premium signed merchandise!
            </p>
            <button
              onClick={startQuiz}
              className="px-8 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-black text-xl font-['Bebas_Neue'] transition-transform hover:scale-105"
            >
              START QUIZ!
            </button>
            <div>
              <Leaderboard leaderboard={leaderboard} />
            </div>
          </div>
        ) : !quizCompleted ? (
          <div className="bg-neutral-800/80 backdrop-blur-sm rounded-lg shadow-lg p-5 md:p-7">
            {/* Top bar with question counter, score and timer */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-white text-base mr-4">
                  Question {currentQuestion + 1}/{questions.length}
                </span>
                <span className="text-white text-base">
                  Score: {score}
                </span>
              </div>
              <div className={`px-3 py-1 rounded-full ${
                time < 30 ? 'bg-green-700/50' : time < 60 ? 'bg-amber-700/50' : 'bg-red-700/50'
              } flex items-center`}>
                <svg className="w-4 h-4 mr-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className={`text-sm font-mono ${
                  time < 30 ? 'text-white' : time < 60 ? 'text-amber-300' : 'text-red-300'
                }`}>
                  {formatTime(time)}
                </span>
              </div>
            </div>

            {/* Question/Answer Container */}
            <div className="relative py-4 md:py-8 my-3 flex justify-center min-h-[200px]">
              {/* Question - Fades out when answered */}
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 
                ${answerChecked ? 'opacity-0 transform scale-95' : 'opacity-100 scale-100'}`}>
                <h2 className="text-xl md:text-2xl font-['Bebas_Neue'] text-white text-center max-w-2xl">
                  {questions[currentQuestion].question}
                </h2>
              </div>
              
              {/* Image - Fades in when answered */}
              {answerChecked && (
  <div className={`absolute inset-0 transition-all duration-500 flex flex-col items-center justify-center
    ${showAnswer ? 'opacity-100 transform scale-100' : 'opacity-0 scale-95'}`}>
    {/* Always show the correct answer text */}
    <div className="text-amber-300 text-xl font-['Bebas_Neue'] mb-4">
      Correct Answer: {questions[currentQuestion].options[questions[currentQuestion].correctanswer]}
    </div>
    
    {/* Use a placeholder for all answers */}
    <div className="bg-amber-500/20 border-2 border-amber-500 rounded-lg p-6 flex items-center justify-center" 
         style={{width: '400px', height: '200px'}}>
      <p className="text-amber-300 text-lg font-bold text-center">
        {questions[currentQuestion].answertext.substring(0, 150)}
        {questions[currentQuestion].answertext.length > 150 ? '...' : ''}
      </p>
    </div>
  </div>
)}
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {questions[currentQuestion].options.map((option, index) => (
                <div 
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-300 flex items-center
                    ${answerChecked 
                      ? index === questions[currentQuestion].correctanswer
                        ? 'bg-green-500/20 border-2 border-green-500'
                        : selectedOption === index 
                          ? 'bg-red-500/20 border-2 border-red-500 opacity-70'
                          : 'opacity-50 bg-neutral-700'
                      : selectedOption === index 
                        ? 'bg-amber-500/20 border-2 border-amber-500'
                        : 'bg-neutral-700 hover:bg-neutral-600'
                    }`}
                >
                  <p className="text-white text-base flex-grow">{option}</p>
                  {answerChecked && (
                    index === questions[currentQuestion].correctanswer ? (
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : selectedOption === index ? (
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : null
                  )}
                </div>
              ))}
            </div>

            {/* Answer Explanation Text */}
            {showAnswer && (
              <div className="animate-fade-in bg-neutral-700/70 p-4 rounded-lg mb-6">
                <p className="text-amber-300 text-lg font-['Bebas_Neue'] mb-2">DID YOU KNOW?</p>
                <p className="text-white text-sm md:text-base">
                  {questions[currentQuestion].answertext}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center mt-6">
              {!answerChecked ? (
                <button
                  onClick={checkAnswer}
                  disabled={selectedOption === null}
                  className={`px-6 py-2 rounded-lg text-base font-['Bebas_Neue'] ${
                    selectedOption === null
                      ? 'bg-neutral-600 text-neutral-400 cursor-not-allowed'
                      : 'bg-amber-500 hover:bg-amber-600 text-black transition-transform hover:scale-105'
                  }`}
                >
                  CHECK ANSWER
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-black text-base font-['Bebas_Neue'] transition-transform hover:scale-105 mt-4"
                >
                  {currentQuestion < questions.length - 1 ? 'NEXT QUESTION' : 'FINISH QUIZ'}
                </button>
              )}
            </div>
          </div>
        ) : (
          // Quiz Results
          <div className="bg-neutral-800/80 backdrop-blur-sm rounded-lg shadow-lg p-5 md:p-7 text-center animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-['Bebas_Neue'] text-amber-500 mb-4">
              {time === 120 ? "TIME'S UP!" : "QUIZ COMPLETED!"}
            </h2>
            <p className="text-white text-lg mb-3">
              Your Score: {score} out of {questions.length}
            </p>
            <p className="text-white text-lg mb-6">
              {time === 120 && score < questions.length * 0.7 
                ? "You ran out of time! Try again and see if you can answer faster."
                : score === questions.length 
                  ? "Perfect! You're a cricket master!" 
                  : score >= questions.length * 0.7 
                    ? "Great job! You know your cricket well!"
                    : "Nice try! Keep learning about cricket!"}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
            <form action={async (formData: FormData) => {
              await createFan(formData);
            }} className="w-full max-w-md mx-auto mb-6 space-y-3">
  <div className="space-y-3">
    <input 
      name="name" 
      placeholder="Your Name" 
      className="w-full px-4 py-2 bg-neutral-700 text-white placeholder-neutral-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
      required
    />
    <input 
      name="phone" 
      placeholder="Phone Number" 
      className="w-full px-4 py-2 bg-neutral-700 text-white placeholder-neutral-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
      required
    />
    <input 
      name="email" 
      placeholder="Email Address" 
      type="email"
      className="w-full px-4 py-2 bg-neutral-700 text-white placeholder-neutral-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
      required
    />
    
    {/* Score field - read-only with actual score */}
    <div className="flex items-center w-full px-4 py-2 bg-neutral-700 text-white rounded-lg border border-amber-500/30">
      <span className="text-amber-400 mr-2">Your Score:</span>
      <span className="font-bold">{score} / {questions.length}</span>
      <input 
        name="score" 
        type="hidden"
        value={score}
        readOnly
      />
    </div>
    
    {/* Time taken - hidden input */}
    <div className="flex items-center w-full px-4 py-2 bg-neutral-700 text-white rounded-lg border border-amber-500/30">
      <span className="text-amber-400 mr-2">Time Taken:</span>
      <span className="font-bold">{formatTime(time)}</span>
      <input 
        name="time" 
        type="hidden"
        value={time}
        readOnly
      />
    </div>
  </div>
  
  <button 
    type="submit"
    className="w-full px-5 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-black text-base font-['Bebas_Neue'] transition-transform hover:scale-105"
  >
    GET YOUR PREMIUM MERCHANDISE
  </button>
</form>
            </div>
            <button
                onClick={resetQuiz}
                className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-black text-base font-['Bebas_Neue'] transition-transform hover:scale-105"
              >
                TRY AGAIN
              </button>
              <Link href="/">
                <button className="px-5 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-white text-base font-['Bebas_Neue'] transition-transform hover:scale-105">
                  BACK TO HOME
                </button>
              </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizCard;