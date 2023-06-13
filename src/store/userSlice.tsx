import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserDataType = {
  name: string;
  email: string;
  phoneNo: string;
  password: string;
  image: string;
};

export type UserLoginType = {
  email: string;
  password: string;
};

export type InitialStateType = {
  user: UserDataType | null;
  isLoggedIn: boolean;
  error: string;
  isError: boolean;
};

const getUserFromLocalStorage = (): UserDataType | null => {
  const userDataString = localStorage.getItem('user');
  if (userDataString) {
    return JSON.parse(userDataString) as UserDataType;
  }
  return null;
};

const setUserToLocalStorage = (user: UserDataType): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

const removeUserFromLocalStorage = (): void => {
  localStorage.removeItem('user');
};

const initialState: InitialStateType = {
  user: getUserFromLocalStorage(),
  isLoggedIn: false,
  error: '',
  isError: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserDataType>) => {
      const userData = getUserFromLocalStorage();
      const { email } = action.payload;
      if (userData && email === userData.email) {
        state.isError = true;
        state.error = 'User Already Has an Account!';
        return;
      }
      state.user = action.payload;
      state.isLoggedIn = true;
      state.error = '';
      state.isError = false;
      setUserToLocalStorage(action.payload);
    },
    resetUser: (state) => {
      removeUserFromLocalStorage();
      state.user = null;
      state.isLoggedIn = false;
      state.error = '';
      state.isError = false;
    },
    loginUser: (state, action: PayloadAction<UserLoginType>) => {
      const userData = getUserFromLocalStorage();
      const { email, password } = action.payload;
      if (userData && userData.email === email && userData.password === password) {
        state.isLoggedIn = true;
        state.user = userData;
        state.error = '';
        state.isError = false;
        return;
      }
      state.isError = true;
      state.error = 'User Not Found';
    },
  },
});

export const { setUser, resetUser, loginUser } = userSlice.actions;
export default userSlice.reducer;
