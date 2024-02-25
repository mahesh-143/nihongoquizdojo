import React from "react";
import { Navbar } from "./components/Navbar";
import { Outlet } from "react-router";
import { Box } from "@kuma-ui/core";

function App() {
  return (
    <>
      <Navbar />
      <Box px={16} maxWidth="1280px" marginX="auto" fontFamily="fonts.body">
        <Outlet />
      </Box>
    </>
  );
}

export default App;
