import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const API_USERS = "http://localhost:2211/users";
export const API_REELS = "http://localhost:2211/reels";

// Интерфейсы
interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  userId: string;
}

interface ReelsData {
  id: string;
  reels: string;
  userId: string;
}

interface RegistrationState {
  data: (UserData | ReelsData)[]; // Обновлен тип данных
  inpNameRegist: string;
  inpEmailRegist: string;
  inpPasswordRegist: string;
  loading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: RegistrationState = {
  data: [],
  inpNameRegist: "",
  inpEmailRegist: "",
  inpPasswordRegist: "",
  loading: false,
  error: null,
};

export const deleteReel = createAsyncThunk(
  "registration/deleteReel",
  async (reelId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_REELS}/${reelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return reelId;
    } catch (error: any) {
      return rejectWithValue(error.message || "Ошибка при удалении видео");
    }
  }
);

// Асинхронные экшены
export const getData = createAsyncThunk("registration/getData", async () => {
  const { data } = await axios.get<UserData[]>(API_USERS);
  return data;
});

export const postData = createAsyncThunk(
  "registration/postData",
  async (userData: { name: string; email: string; password: string }) => {
    const { data } = await axios.post<UserData>(API_USERS, userData);
    localStorage.setItem("userId", data.id);
    return data;
  }
);

export const getReels = createAsyncThunk("registration/getReels", async () => {
  const { data } = await axios.get<ReelsData[]>(API_REELS);
  return data;
});

export const postReels = createAsyncThunk(
  "registration/postReels",
  async (reelsData: { reels: string; userId: string }) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      throw new Error("User is not logged in");
    }

    const { data } = await axios.post<ReelsData>(API_REELS, {
      reels: reelsData.reels,
      userId,
    });

    return data;
  }
);

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setNameRegist: (state, action: PayloadAction<string>) => {
      state.inpNameRegist = action.payload;
    },
    setEmailRegist: (state, action: PayloadAction<string>) => {
      state.inpEmailRegist = action.payload;
    },
    setPasswordRegist: (state, action: PayloadAction<string>) => {
      state.inpPasswordRegist = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      localStorage.setItem("userId", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getData.fulfilled,
        (state, action: PayloadAction<UserData[]>) => {
          state.data = action.payload;
          state.loading = false;
        }
      )
      .addCase(getData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка при загрузке данных";
      });

    builder
      .addCase(postData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postData.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.data.push(action.payload);
        state.loading = false;
      })
      .addCase(postData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка при отправке данных";
      });

    builder
      .addCase(getReels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getReels.fulfilled,
        (state, action: PayloadAction<ReelsData[]>) => {
          state.data = action.payload;
          state.loading = false;
        }
      )
      .addCase(getReels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка при загрузке Reels";
      });

    builder
      .addCase(postReels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        postReels.fulfilled,
        (state, action: PayloadAction<ReelsData>) => {
          state.data.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(postReels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка при отправке Reels";
      });
    builder
      .addCase(deleteReel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReel.fulfilled, (state, action: PayloadAction<string>) => {
        state.data = state.data.filter(
          (reel: any) => reel.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteReel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setNameRegist, setEmailRegist, setPasswordRegist, setUserId } =
  registrationSlice.actions;

export default registrationSlice.reducer;
