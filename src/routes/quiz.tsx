import React, { useEffect, useState } from "react";
import { hiragana, katakana } from "../utils/kanaData.ts";
import {
  Box,
  Button,
  Grid,
  css,
  Text,
  VStack,
  HStack,
  Link,
} from "@kuma-ui/core";
import { NavLink, useParams } from "react-router-dom";

type Kana = {
  kana: string;
  roumaji: string;
};

type NavLinksTypes = {
  href: string;
  key: string;
  text: string;
};

type Category = "all" | "hiragana" | "katakana";

const categoryLinks = [
  { href: "/quiz/all", key: "Home", text: "All" },
  { href: "/quiz/hiragana", key: "hiragana", text: "Hiragana" },
  { href: "/quiz/katakana", key: "katakana", text: "Katakana" },
];

const CategoryLink = ({ href, text }: NavLinksTypes) => {
  return (
    <Link
      as={NavLink}
      to={href}
      textDecoration="none"
      color="colors.primary"
      fontWeight={600}
      fontSize={"fontSizes.md"}
      _hover={{
        textDecoration: "underline",
        textDecorationThickness: "3px",
        textUnderlineOffset: "5px",
        textDecorationColor: "colors.accent2",
      }}
      style={({ isActive }: any) => {
        return isActive
          ? {
              textDecoration: "underline",
              textDecorationThickness: "3px",
              textUnderlineOffset: "5px",
              textDecorationColor: "#6B8E23",
            }
          : {};
      }}
    >
      <Text>{text}</Text>
    </Link>
  );
};

export const Quiz = () => {
  const [category, setCategory] = useState<Category>("all");
  const [questions, setQuestions] = useState<Kana[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>();
  const [isCorrect, setIsCorrect] = useState<Boolean | undefined>();

  let params = useParams();

  const getQuestion = () => {
    setSelectedAnswer(undefined);
    setIsCorrect(undefined);
    let allQuestions;
    switch (category) {
      case "all":
        allQuestions = [...hiragana, ...katakana].sort(
          () => Math.random() - 0.5,
        );
        break;
      case "katakana":
        allQuestions = [...katakana].sort(() => Math.random() - 0.5);
        break;
      case "hiragana":
        allQuestions = [...hiragana].sort(() => Math.random() - 0.5);
        break;
      default:
        console.error("Invalid category");
        return;
    }
    setQuestions(allQuestions);
  };

  const getCorrectAnswer = (): string => {
    return questions[currentQuestion]?.roumaji;
  };

  const handleAnswer = (selectedOption: string | undefined) => {
    setSelectedAnswer(selectedOption);
    if (selectedOption === getCorrectAnswer()) {
      correctAnswers.push(questions[currentQuestion]?.kana);
      setIsCorrect(true);
    } else {
      wrongAnswers.push(questions[currentQuestion]?.kana);
      setIsCorrect(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedAnswer(undefined);
      setIsCorrect(undefined);
    } else {
      console.log("Quiz completed!");
    }
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
    switch (params.category) {
      case "all":
        setCategory("all");
        break;
      case "hiragana":
        setCategory("hiragana");
        break;
      case "katakana":
        setCategory("katakana");
        break;
      default:
        //TODO: redirect to 404
        break;
    }
  }, []);
  return (
    <>
      <HStack
        alignItems="center"
        py="2em"
        px={16}
        maxWidth="1280px"
        marginX="auto"
        gap="2rem"
        fontFamily="fonts.body"
      >
        {categoryLinks.map((link) => (
          <CategoryLink key={link.key} href={link.href} text={link.text} />
        ))}
      </HStack>
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
            <VStack gap="1rem">
              <Text fontSize="fontSizes.xl" alignSelf="left">
                What letter is this ?
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
            {!selectedAnswer && (
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
            )}
            {selectedAnswer && (
              <VStack gap="1rem">
                {isCorrect ? (
                  <Text fontSize="fontSizes.lg">Well done!</Text>
                ) : (
                  <VStack gap="1rem">
                    <Text fontSize="fontSizes.lg">False! It's</Text>
                    <Text fontSize="4rem">{getCorrectAnswer()}</Text>
                  </VStack>
                )}
                <Button variant="secondary" onClick={handleNextQuestion}>
                  Next Letter
                </Button>
              </VStack>
            )}
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
        <Box mx="auto">
          <Text fontSize="fontSizes.lg" fontFamily="fonts.body" mb="1rem">
            {correctAnswers.length} correct
          </Text>
          <Grid gridTemplateColumns={["", "repeat(3, 1fr)"]} gap="0.5rem">
            {correctAnswers.map((correctAnswer) => (
              <Text
                className={css`
                  font-size: clamp(0.5rem, 1rem + 10vw, 3rem);
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
          </Grid>
        </Box>

        <Box mx="auto">
          <Text fontSize="fontSizes.lg" fontFamily="fonts.body" mb="1rem">
            {wrongAnswers.length} wrong
          </Text>
          <Grid gridTemplateColumns={["", "repeat(3, 1fr)"]} gap="0.5rem">
            {wrongAnswers.map((wrongAnswer) => (
              <Text
                className={css`
                  font-size: clamp(0.5rem, 1rem + 10vw, 3rem);
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
          </Grid>
        </Box>
      </Box>
    </>
  );
};
