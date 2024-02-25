import React, { useEffect, useState } from "react";
import { hiragana } from "../utils/hiragana.ts";
import { Box, Button, Grid, css, Text, VStack } from "@kuma-ui/core";

interface Kana {
  roumaji: string;
  kana: string;
}

export const Quiz = () => {
  const [questions, setQuestions] = useState<Kana[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<string[]>([]);

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
      correctAnswers.push(questions[currentQuestion]?.kana);
    } else {
      wrongAnswers.push(questions[currentQuestion]?.kana);
    }
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const getShuffledOptions = () => {
    const incorrectOptions = hiragana
      .filter((kana) => kana?.roumaji !== getCorrectAnswer())
      .map((kana) => kana?.roumaji);

    const randomIncorrectOptions = incorrectOptions
      .sort(() => Math.random() - 0.5)
      .slice(0, 7);

    const options = [getCorrectAnswer(), ...randomIncorrectOptions];

    return options.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    getQuestion();
  }, []);
  return (
    <>
      <Box
        display="flex"
        flexDirection={["column", "column", "row"]}
        alignItems="center"
        justifyContent="space-around"
        gap="2rem"
        bg="white"
        borderRadius="2rem"
        p="5rem"
        maxW="948px"
        margin="auto"
      >
        {questions.length > 0 && currentQuestion < questions.length ? (
          <>
            <VStack>
              <Text fontSize="fontSizes.xl" mb="1rem" alignSelf="left">
                What letters this ?
              </Text>
              <Box
                className={css`
                  font-size: clamp(4rem, 1rem + 10vw, 10rem);
                `}
                border="solid"
                borderColor="colors.accent2"
                width="fit-content"
                borderRadius="2rem"
                p="2rem"
              >
                {questions[currentQuestion].kana}
              </Box>
            </VStack>
            <Grid
              my="auto"
              width="fit-content"
              gridTemplateColumns="repeat(2, 1fr)"
              gap="1rem"
            >
              {getShuffledOptions().map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={css`
                    font-size: clamp(1rem, 1rem + 10vw, 1.4rem);
                  `}
                >
                  {option}
                </Button>
              ))}
            </Grid>
          </>
        ) : (
          <p>
            {questions.length > 0 ? "Quiz completed!" : "Loading questions..."}
          </p>
        )}
      </Box>
      <Box
        marginTop="2rem"
        display="flex"
        flexDirection={["column", "column", "row"]}
        alignItems="start"
        justifyContent="space-around"
        gap="2rem"
        borderRadius="2rem"
        p="5rem"
        maxW="948px"
        margin="auto"
      >
        <Box>
          <Text fontSize="fontSizes.lg" mb="1rem">
            {correctAnswers.length} correct
          </Text>
          {correctAnswers.map((correctAnswer) => (
            <Text
              className={css`
                font-size: clamp(1rem, 1rem + 10vw, 3rem);
              `}
              border="solid"
              borderColor="green"
              bg="white"
              width="fit-content"
              borderRadius="1rem"
              p="1rem"
              mt="0.5rem"
            >
              {correctAnswer}
            </Text>
          ))}
        </Box>

        <Box>
          <Text fontSize="fontSizes.lg" fontFamily="fonts.body" mb="1rem">
            {wrongAnswers.length} wrong
          </Text>
          {wrongAnswers.map((wrongAnswer) => (
            <Text
              className={css`
                font-size: clamp(1rem, 1rem + 10vw, 3rem);
              `}
              border="solid"
              borderColor="red"
              bg="white"
              width="fit-content"
              borderRadius="1rem"
              p="1rem"
              mt="0.5rem"
            >
              {wrongAnswer}
            </Text>
          ))}
        </Box>
      </Box>
    </>
  );
};
