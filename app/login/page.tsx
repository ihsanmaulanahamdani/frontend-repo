"use client";

import React from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { logIn, setToken } from "@/store/action";

import { useAppDispatch } from "@/lib/hooks";

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [isError, setIsError] = React.useState<boolean>(false);

  const onLogin = async (e: any) => {
    e.preventDefault();
    try {
      dispatch(logIn({ email, password }));
      router.push("/");
    } catch (error) {
      setIsError(true);
    }
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(setToken(token));
      router.push("/");
    }
  }, []);

  return (
    <Box
      width="100%"
      height="98vh"
      component="section"
      display="flex"
      bgcolor="#fafafa"
      alignItems="center"
      justifyContent="center"
      onSubmit={onLogin}
    >
      {isError && <Alert severity="error">Email or password wrong!</Alert>}
      <Box
        width={240}
        component="form"
        display="flex"
        flexDirection="column"
        gap={2}
        bgcolor="white"
        padding={3}
        borderRadius={3}
      >
        <TextField
          id="email"
          label="Email"
          type="email"
          required
          variant="outlined"
          size="small"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          required
          variant="outlined"
          size="small"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Box gap={1} display="flex" flexDirection="column">
          <Button type="submit" variant="contained">
            Login
          </Button>
          <Button href="/" variant="outlined">
            Visit as Guest
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
