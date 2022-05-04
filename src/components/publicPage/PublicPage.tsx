import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Link,
} from "@mui/material";

/** Generates a random string containing numbers and letters of n characters */
const generateRandomString = (n: number) =>
  (Math.random().toString(36) + Array(n).join("0")).slice(2, n + 2);

// TODO: change for prod
const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET, REACT_APP_REDIRECT_URL } =
  process.env;

const queryString = require("query-string");

export const PublicPage: React.FC = () => {
  //This realistically shouldn't be needed, but I want to show a loading state change to the user before the redirect.
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onLoadingClick = () => {
    setLoading(true);
    const scope = "user-top-read";
    const state = generateRandomString(16);

    const authURL =
      "https://accounts.spotify.com/authorize?" +
      queryString.stringify({
        response_type: "code",
        client_id: REACT_APP_CLIENT_ID,
        scope: scope,
        redirect_uri: REACT_APP_REDIRECT_URL,
        state: state,
      });

    console.log(authURL);
    window.location.replace(authURL);
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignContent: "space-around",
      }}
    >
      <Typography component="h1" variant="h5">
        Sign in to your Spotify Account
      </Typography>
      <Typography sx={{ width: "50%" }} align="center" variant="body2">
        This app requires authorization with spotify in order to retrieve and
        display information about your top songs.
      </Typography>
      <Box sx={{ mt: 1 }}>
        <LoadingButton
          onClick={onLoadingClick}
          fullWidth
          loading={loading}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link href="/public" variant="body2">
              {"Don't have an account? Use pre-loaded data"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PublicPage;
