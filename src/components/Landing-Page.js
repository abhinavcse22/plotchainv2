import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Button,
  AppBar,
  Toolbar,
  Paper,
} from "@mui/material";

const LandingPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url('/16623.jpg')`, // 🔁 Replace with your actual image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Navbar */}
      <AppBar position="static" elevation={0} sx={{ background: "rgba(0,0,0,0.5)", zIndex: 2 }}>
        <Toolbar sx={{ justifyContent: "space-between", px: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#ffffff",
              fontFamily: "monospace",
              letterSpacing: 1,
            }}
          >
            Plotchain
          </Typography>

          <Box sx={{ display: "flex", gap: 3 }}>
            <Button component={Link} to="/" sx={{ color: "#fff" }}>
              Home
            </Button>
            <Button component={Link} to="/about" sx={{ color: "#fff" }}>
              About
            </Button>
            <Button component={Link} to="/buyer" sx={{ color: "#fff" }}>
              Buyer
            </Button>
            <Button component={Link} to="/seller" sx={{ color: "#fff" }}>
              Seller
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Centered Content */}
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <Paper
          elevation={5}
          sx={{
            p: 5,
            borderRadius: 4,
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(16px)",
            textAlign: "center",
            color: "#000",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mb: 2,
              fontFamily: "Poppins, sans-serif",
              color: "#000",
            }}
          >
            Welcome to Plotchain
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 4, color: "#333" }}>
            The future of land ownership — Secure, Transparent, and Decentralized.
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <Button
              component={Link}
              to="/buyer"
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: 10 }}
            >
              I'm a Buyer
            </Button>
            <Button
              component={Link}
              to="/seller"
              variant="outlined"
              color="inherit"
              size="large"
              sx={{
                borderRadius: 10,
                borderColor: "#000",
                color: "#000",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.05)",
                },
              }}
            >
              I'm a Seller
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LandingPage;
