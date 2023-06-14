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

/*----------- Local storage functions---------- */
const getUsersFromLocalStorage = (): UserDataType[] | null => {
  const usersData = localStorage.getItem('users');
  if (usersData) {
    return JSON.parse(usersData);
  }
  return null;
};

const setUserToLocalStorage = (user: UserDataType): void => {
  localStorage.setItem("authuser",JSON.stringify(user));
  const usersData = JSON.parse(localStorage.getItem('users') || '[]');
  usersData.push(user);
  localStorage.setItem('users', JSON.stringify(usersData));
};


const removeUserFromLocalStorage = (email: string): void => {
  const usersData = JSON.parse(localStorage.getItem('users') || '[]');
  const updatedUsersData = usersData.filter((user: UserDataType) => user.email !== email);
  localStorage.setItem('users', JSON.stringify(updatedUsersData));
};




/*--------- Local storage functions ends ----------*/

const initialState: InitialStateType = {
  user: localStorage.getItem("authuser") ? JSON.parse((localStorage.getItem("authuser") as string)) as UserDataType : null,
  isLoggedIn: localStorage.getItem('authuser') ? true : false,
  error: '',
  isError: false,
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserDataType>) => {
      const { email } = action.payload;
      const usersData = getUsersFromLocalStorage();
      const user = usersData?.find((user) => user.email === email);
    
      if (user) {
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
      removeUserFromLocalStorage(state.user?.email!);
      state.user = null;
      state.isLoggedIn = false;
      state.error = '';
      state.isError = false;
    },

    removeError:(state)=>{
      state.error=""
      state.isError=false
    },

    loginUser: (state, action: PayloadAction<UserLoginType>) => {
      const { email, password } = action.payload;
      const usersData = getUsersFromLocalStorage();
      const user = usersData?.find((user) => user.email === email);
      if (user && user.email === email && user.password === password) {
        localStorage.setItem("authuser",JSON.stringify(user));
        state.isLoggedIn = true;
        state.user = user;
        state.error = '';
        state.isError = false;
        return;
      }
      state.isError = true;
      state.error = 'User Not Found';
    },
  },
});

export const { setUser, resetUser, loginUser ,removeError } = userSlice.actions;
export default userSlice.reducer;
