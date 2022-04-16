import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../apiService";

const initialState = {
  books: [],
  status: "idle",
  errorMessage: "",
  loading: false,
  book: {},
  favorites: [],
};

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async ({ pageNum, limit, query }, thunkApi) => {
    let url = `/books?_page=${pageNum}&_limit=${limit}`;
    if (query) url += `&q=${query}`;
    const response = await api.get(url);
    return response.data;
  }
);

export const getSingleBooks = createAsyncThunk(
  "books/getSingleBooks",
  async ({ bookId }) => {
    const response = await api.get(`/books/${bookId}`);
    return response.data;
  }
);

export const addFavoriteBooks = createAsyncThunk(
  "books/addFavoriteBooks",
  async ({ addingBook }) => {
    await api.post(`/favorites`, addingBook);
    toast.success("The book has been added to the reading list!");
  }
);

export const getFavoriteBooks = createAsyncThunk(
  "books/getFavoriteBooks",
  async () => {
    const response = await api.get(`/favorites`);
    return response.data;
  }
);

export const deleteFavoriteBooks = createAsyncThunk(
  "books/deleteFavoriteBooks",
  async ({ removedBookId }) => {
    await api.delete(`/favorites/${removedBookId}`);
    toast.success("The book has been removed from the reading list!");
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.status = "idle";
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.status = "fail";
        state.loading = false;
        state.errorMessage = action.error.message;
      });

    builder
      .addCase(getSingleBooks.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(getSingleBooks.fulfilled, (state, action) => {
        state.status = "idle";
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(getSingleBooks.rejected, (state, action) => {
        state.status = "fail";
        state.loading = false;
        state.errorMessage = action.error.message;
      });

    builder
      .addCase(addFavoriteBooks.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(addFavoriteBooks.fulfilled, (state) => {
        state.status = "idle";
        state.loading = false;
      })
      .addCase(addFavoriteBooks.rejected, (state, action) => {
        state.status = "fail";
        state.loading = false;
        state.errorMessage = action.error.message;
      });

    builder
      .addCase(getFavoriteBooks.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(getFavoriteBooks.fulfilled, (state, action) => {
        state.status = "idle";
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(getFavoriteBooks.rejected, (state, action) => {
        state.status = "fail";
        state.loading = false;
        state.errorMessage = action.error.message;
      });

    builder
      .addCase(deleteFavoriteBooks.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(deleteFavoriteBooks.fulfilled, (state) => {
        state.status = "idle";
        state.loading = false;
      })
      .addCase(deleteFavoriteBooks.rejected, (state, action) => {
        state.status = "fail";
        state.loading = false;
        state.errorMessage = action.error.message;
      });
  },
});

export default bookSlice.reducer;
