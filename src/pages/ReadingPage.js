import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Box,
  Card,
  Stack,
  CardMedia,
  CardActionArea,
  Typography,
  CardContent,
} from "@mui/material";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFavoriteBooks,
  getFavoriteBooks,
} from "../features/books/bookSlice";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const ReadingPage = () => {
  const [removedBookId, setRemovedBookId] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { favorites, loading } = useSelector((state) => state.books);

  const handleClickBook = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  const removeBook = (bookId) => {
    setRemovedBookId(bookId);
  };

  useEffect(() => {
    dispatch(getFavoriteBooks());
  }, [removedBookId]);

  useEffect(() => {
    dispatch(deleteFavoriteBooks({ removedBookId }));
    dispatch(getFavoriteBooks());
  }, [removedBookId]);

  return (
    <Container>
      <Typography variant="h3" sx={{ textAlign: "center" }} m={3}>
        Book Store
      </Typography>
      {loading ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }}>
          <ClipLoader color="inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-around"
          flexWrap={"wrap"}
        >
          {favorites.map((favorite) => (
            <Card
              key={favorite.id}
              sx={{
                width: "12rem",
                height: "27rem",
                marginBottom: "2rem",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={`${BACKEND_API}/${favorite.imageLink}`}
                  alt={`${favorite.title}`}
                  onClick={() => handleClickBook(favorite.id)}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {`${favorite.title}`}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="div">
                    {`${favorite.author}`}
                  </Typography>
                  <Button
                    sx={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      backgroundColor: "secondary.light",
                      color: "secondary.contrastText",
                      padding: "0",
                      minWidth: "1.5rem",
                    }}
                    size="small"
                    onClick={() => removeBook(favorite.id)}
                  >
                    &times;
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default ReadingPage;
