"use client";

import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";

import { onFetchUserData, onUpdateUserData, setToken } from "@/store/action";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { IUser } from "@/types/IUser";
import UpdateButton from "@/components/UpdateButton";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export default function Home() {
  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState<boolean>(false);
  const [id, setId] = React.useState<string>("");
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [gender, setGender] = React.useState<string>("");

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(setToken(token));
    }
    dispatch(onFetchUserData());
  }, []);

  const handleOpen = (el: IUser) => {
    setId(el.id);
    setFirstName(el.firstName);
    setLastName(el.lastName);
    setEmail(el.email);
    setGender(el.gender);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const payload = {
      firstName,
      lastName,
      email,
      gender,
    } as Partial<IUser>;
    dispatch(onUpdateUserData({ id, payload }));
    setOpen(false);
    dispatch(onFetchUserData());
  };

  const { loading, users, isLogin, errorMessage } = useAppSelector(
    (state) => state
  );

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#fafafa", minHeight: "98vh" }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={240}
          component="form"
          display="flex"
          flexDirection="column"
          gap={2}
          bgcolor="white"
          padding={3}
          borderRadius={3}
          sx={style}
          onSubmit={handleSubmit}
        >
          {errorMessage && (
            <Alert severity="error">Email or password wrong!</Alert>
          )}
          <TextField
            id="firstName"
            label="First Name"
            type="text"
            required
            variant="outlined"
            size="small"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            id="lastName"
            label="Last Name"
            type="text"
            required
            variant="outlined"
            size="small"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            required
            variant="outlined"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="gender">Gender</InputLabel>
            <Select
              labelId="gender"
              id="demo-simple-select"
              value={gender}
              label="Gender"
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="MALE">Male</MenuItem>
              <MenuItem value="FEMALE">Female</MenuItem>
            </Select>
          </FormControl>

          <UpdateButton />
        </Box>
      </Modal>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EBUDDY
          </Typography>
          {isLogin ? (
            <Button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
              color="inherit"
            >
              Logout
            </Button>
          ) : (
            <Button href="/login" color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            height: "98vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container marginTop={1} spacing={2} columns={{ xs: 2, sm: 16 }}>
          {users.map((el) => (
            <Grid key={el.id} item xs={2} sm={4}>
              <Card sx={{ bgcolor: "white" }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Full Name
                  </Typography>
                  <Typography variant="h5" component="div">
                    {`${el.firstName} ${el.lastName}`}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Email
                  </Typography>
                  <Typography variant="h5" component="div">
                    {el.email}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleOpen(el)}>
                    Update
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
