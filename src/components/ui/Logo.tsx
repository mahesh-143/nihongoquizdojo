import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { Link, Text } from "@kuma-ui/core";

export const Logo = () => {
  return (
    <Link
      as={ReactLink}
      to="/"
      textDecoration="none"
      fontSize="fontSizes.lg"
      color="colors.primary"
      fontWeight="bold"
    >
      <Text>NihongoQuizDojo</Text>
    </Link>
  );
};
