import React, { useEffect, useState } from "react";
import { hiragana } from "../utils/hiragana.ts";

interface Kana {
  roumaji: string;
  kana: string;
}

export const Quiz = () => {
  const [questions, setQuestions] = useState<Kana[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const getQuestion = () => {
    const shuffledKanaData = [...hiragana].sort(() => Math.random() - 0.5);
    const allQuestions = shuffledKanaData;
    setQuestions(allQuestions);
  };

  const getCorrectAnswer = (): string => {
    return questions[currentQuestion]?.roumaji;
  };

  const handleAnswer = (selectedOption: string | undefined) => {
    if (selectedOption === getCorrectAnswer()) {
      setScore((prevScore) => prevScore + 1);
    }
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const getShuffledOptions = () => {
    const incorrectOptions = hiragana
      .filter((kana) => kana?.roumaji !== getCorrectAnswer())
      .map((kana) => kana?.roumaji);

    const randomIncorrectOptions = incorrectOptions
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const options = [getCorrectAnswer(), ...randomIncorrectOptions];

    return options.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    getQuestion();
  }, []);
  return (
    <div>
      {questions.length > 0 && currentQuestion < questions.length ? (
        <div>
          <p>{questions[currentQuestion].kana}</p>
          <ul>
            {getShuffledOptions().map((option, index) => (
              <li key={index} onClick={() => handleAnswer(option)}>
                {option}
              </li>
            ))}
          </ul>
          <p>score:{score}</p>
        </div>
      ) : (
        <p>
          {questions.length > 0 ? "Quiz completed!" : "Loading questions..."}
        </p>
      )}
    </div>
  );
};
