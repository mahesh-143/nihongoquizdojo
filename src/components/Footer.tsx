import React from "react";
import { Box, Text } from "@kuma-ui/core";

export function Footer() {
  return (
    <Box
      background="#F3F4F6"
      height="75px"
      display="flex"
      alignItems="center"
      fontFamily="fonts.body"
    >
      <Text textAlign="center" margin="auto" fontSize="fontSizes.sm">
        © 2024 <a href="https://github.com/mahesh-143">Mahesh Odedara</a>. All
        rights reserved.
      </Text>
    </Box>
  );
}

export default Footer;
