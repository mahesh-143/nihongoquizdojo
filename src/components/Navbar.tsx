import React from "react";
import { Button, HStack } from "@kuma-ui/core";
import { Logo } from "./ui/Logo";
import { MdMenu } from "react-icons/md";
import NavLink from "./ui/NavLink";

const navLinks = [
  { href: "/", key: "Home", text: "Home" },
  { href: "/quiz/all", key: "Quiz", text: "Quiz" },
];

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
      <HStack as="nav" alignItems="center" fontSize="1rem" gap="2em">
        {navLinks.map((link) => (
          <NavLink key={link.key} href={link.href} text={link.text} />
        ))}
      </HStack>
    </HStack>
  );
};
