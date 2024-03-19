import React from "react";
import { Button, HStack, Link, Text } from "@kuma-ui/core";
import { NavLink as ReactLink } from "react-router-dom";
import { Logo } from "./ui/Logo";
import { MdMenu } from "react-icons/md";

type NavLinksTypes = {
  href: string;
  key: string;
  text: string;
};

const navLinks = [
  { href: "/", key: "Home", text: "Home" },
  { href: "/quiz/all", key: "Quiz", text: "Quiz" },
];

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

export const Navbar = () => {
  return (
    <HStack
      as="header"
      justify="space-between"
      alignItems="center"
      py="2em"
      px={16}
      maxWidth="1280px"
      marginX="auto"
      fontFamily="fonts.body"
    >
      <Logo />
      <HStack
        as="nav"
        alignItems="center"
        fontSize="1rem"
        gap="2em"
        display={["none", "none", "flex"]}
      >
        {navLinks.map((link) => (
          <NavLink key={link.key} href={link.href} text={link.text} />
        ))}
      </HStack>
      <Button variant="ghost" padding="0.6rem" display={["", "", "none"]}>
        <MdMenu size={"1.5rem"} />
      </Button>
    </HStack>
  );
};
