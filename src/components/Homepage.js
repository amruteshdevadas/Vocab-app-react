import React from "react";
import Typography from "@mui/material/Typography";
import { Button, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import CardComponent from "./card";
import card from "./card";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.85),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  marginLeft: 0,
  width: "40%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(0),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "25%",
    [theme.breakpoints.up("xs")]: {
      width: "0ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));
function Homepage() {
  const [search, setSearch] = useState("");
  const [cards, setCards] = useState([]);
  const [searchInput, setSearchInput] = useState({
    _id: "",
    post: [],
  });
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    fetchList();
  }, []);

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    console.log(search);
    await axios
      .get(`https://vocabulary-251.herokuapp.com/getPost/${search}`)
      .then((response) => {
        // setCards(response.data);
        setSearchInput(response.data);
        console.log(response.data);
        setShowSearch(true);
      })
      .catch((error) => {
        console.log(error);
        setCards([]);
      });
  };

  async function fetchList() {
    await axios
      .get(`https://vocabulary-251.herokuapp.com/getPosts`)
      .then((response) => {
        // console.log(response.data)
        const results = response.data;
        setCards(results);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <Paper sx={{ background: "purple", width: "100vw" }}>
        <Grid
           container
           direction="row"
           justifyContent="center"
           alignItems="center"
          sx={{ paddingTop:"1rem" ,paddingLeft:"6rem" }}
          spacing={2}

        >
          <Grid item xs={12} sm={6} md={3} >
          <Typography variant="h4" color="white">
            Vocab
          </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
          <Search
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
          <Button onClick={handleSearch} variant="contained">
            Search
          </Button>
          </Grid>
         <Grid item xs={12} sm={6} md={3}>
         <Link to="/add" style={{ textDecoration: "none", color: "white" }}>
            <Button variant="contained">Add New</Button>
          </Link>
         </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ position: "relative" }}
        >
          
          {showSearch ? (
            <CardComponent item={searchInput} />
          ) : (
            cards.map((item) => {
              return (
                <>
                  <CardComponent item={item} />
                </>
              );
            })
          )}
        </Grid>
      </Paper>
    </>
  );
}

export default Homepage;
