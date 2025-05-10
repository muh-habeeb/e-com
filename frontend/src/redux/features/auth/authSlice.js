// import { createSlice } from "@reduxjs/toolkit";
// const initialState = {
//   userInfo: localStorage.getItem("userInfo")
//     ? JSON.parse(localStorage.getItem("userInfo"))
//     : null,
// };
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setCredentials: (state, action) => {
//       (state.userInfo = action.payload),
//         localStorage.setItem("userInfo", JSON.stringify(action.payload));
//       const expirationTime = new Date().getItem + 30 * 24 * 60 * 60 * 1000;
//       localStorage.setItem("expirationTime", expirationTime);
//     },
//     logout: (state) => {
//       (state.userInfo = null), localStorage.clear();
//     },
//   },
// });

// export const { setCredentials, logout } = authSlice.actions;
// export default authSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

// Initial state where userInfo is fetched from localStorage, or set to null if not available
const initialState = {
  // userInfo: localStorage.getItem("userInfo")
  //   ? JSON.parse(localStorage.getItem("userInfo")) // Parse the stored user info if available
  //   : null, // If not, set userInfo to null
  userInfo: sessionStorage.getItem("userInfo")
    ? JSON.parse(sessionStorage.getItem("userInfo")) // Parse the stored user info if available
    : null, // If not, set userInfo to null
};

const authSlice = createSlice({
  name: "auth", // Name of the slice
  initialState, // Initial state defined above
  reducers: {
    // Action to set user credentials
    setCredentials: (state, action) => {
      // Update state with the new user info from the payload
      state.userInfo = action.payload;

      // Store the updated user info in localStorage
      // localStorage.setItem("userInfo", JSON.stringify(action.payload));
      sessionStorage.setItem("userInfo", JSON.stringify(action.payload));

      // Calculate the expiration time for the session (30 days from now)
      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;

      // Store the expiration time in localStorage
      // localStorage.setItem("expirationTime", expirationTime);
      sessionStorage.setItem("expirationTime", expirationTime);
    },

    // Action to log the user out
    logout: (state) => {
      // Set userInfo to null, effectively logging the user out
      state.userInfo = null;

      // Clear all localStorage items (including userInfo and expirationTime)
      // localStorage.clear();
      sessionStorage.clear();
    },
  },
});

// Export the actions to be used in other parts of the app
export const { setCredentials, logout } = authSlice.actions;

// Export the reducer so it can be added to the store
export default authSlice.reducer;
