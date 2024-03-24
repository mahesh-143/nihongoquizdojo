import { Box, Text } from "@kuma-ui/core";
import React from "react";
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  return (
    <Box
      px={16}
      maxWidth="1280px"
      height="100vh"
      marginX="auto"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap="2em"
      fontFamily="fonts.body"
    >
      <Text fontSize="fontSizes.xl">Oops!</Text>
      <Text fontSize="3em">Sorry, an unexpected error has occurred.</Text>
      <Text fontSize="fontSizes.xl">{errorMessage}</Text>
      <Link to="/"> &larr; Go Back</Link>
    </Box>
  );
}
