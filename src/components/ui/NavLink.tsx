import React from "react";
import { Link, Text } from "@kuma-ui/core";
import { NavLink as ReactLink } from "react-router-dom";

type NavLinksTypes = {
  href: string;
  key: string;
  text: string;
};

const NavLink = ({ href, text }: NavLinksTypes) => {
  return (
    <Link
      as={ReactLink}
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
      // there is nothing we can do - Napolean
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

export default NavLink;
