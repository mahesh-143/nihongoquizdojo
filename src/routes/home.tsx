import { Box, Button, css, HStack, Text } from "@kuma-ui/core";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      padding="1rem"
      height="100vh"
      maxHeight="35rem"
    >
      <Text
        color="colors.accent2"
        fontSize="fontSizes.xl"
        fontWeight="600"
        mb="2rem"
        textDecorationLine="underline"
        textDecorationColor="colors.accent"
        textDecorationThickness="5px"
        textUnderlineOffset="15px"
      >
        日本語クイズ道場
      </Text>
      <Text
        fontFamily="fonts.heading"
        as="p"
        mb="spacings.md"
        className={css`
          font-size: clamp(3rem, 1rem + 10vw, 5rem);
        `}
      >
        Unlock the Beauty of Japanese Characters with Ease!
      </Text>
      <Text fontFamily="fonts.body" fontSize="fontSizes.xl" mb="2rem">
        Master the Art of Reading Japanese Letters Seamlessly – Your Gateway to
        Language Mastery Begins Here.
      </Text>
      <HStack gap="spacings.md">
        <Button
          as={Link}
          to="/quiz"
          textDecoration="none"
          fontFamily="fonts.body"
        >
          Play Quiz
        </Button>
        {/* <Button */}
        {/*   variant="secondary" */}
        {/*   as={Link} */}
        {/*   to="#" */}
        {/*   textDecoration="none" */}
        {/*   fontFamily="fonts.body" */}
        {/* > */}
        {/*   Learn more */}
        {/* </Button> */}
      </HStack>
    </Box>
  );
};
