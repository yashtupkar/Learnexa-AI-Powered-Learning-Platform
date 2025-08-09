// // src/authSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const userFromStorage = JSON.parse(localStorage.getItem("user"));

// const initialState = {
//   user: userFromStorage || null,
//   isAuthenticated: !!userFromStorage,
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     loginStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     loginSuccess: (state, action) => {
//       state.user = action.payload;
//       state.isAuthenticated = true;
//       state.loading = false;
//       localStorage.setItem("user", JSON.stringify(action.payload));
//     },
//     loginFailure: (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//       localStorage.removeItem('sidebar');
//     },
//     userUpdate: (state, action) => {
//       state.user = action.payload;
//       state.loading = false;
//       localStorage.setItem("user", JSON.stringify(action.payload));
//     }
//   },
// });

// export const { loginStart, loginSuccess, userUpdate, loginFailure, logout } =
//   authSlice.actions;
// export default authSlice.reducer;


// src/authSlice.js - Updated version with JWT auto-logout
import { createSlice } from "@reduxjs/toolkit";

// JWT utility functions
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

const isTokenExpired = (token) => {
  if (!token) return true;
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  return decoded.exp * 1000 < Date.now();
};

const getTimeUntilExpiry = (token) => {
  if (!token) return 0;
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return 0;
  return Math.max(0, (decoded.exp * 1000) - Date.now());
};

// Validate existing data
const userFromStorage = JSON.parse(localStorage.getItem("user"));
const tokenFromStorage = localStorage.getItem("token");

// Check if token is expired on app load
let validUser = null;
if (userFromStorage && tokenFromStorage && !isTokenExpired(tokenFromStorage)) {
  validUser = userFromStorage;
} else if (tokenFromStorage && isTokenExpired(tokenFromStorage)) {
  // Clear expired data
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem('sidebar');
}

const initialState = {
  user: validUser,
  isAuthenticated: !!validUser,
  loading: false,
  error: null,
};

// Auto logout timer
let logoutTimer = null;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem("user", JSON.stringify(action.payload));
      
      // Set auto logout timer if token is provided
      const token = localStorage.getItem("token");
      if (token) {
        const timeUntilExpiry = getTimeUntilExpiry(token);
        if (timeUntilExpiry > 0) {
          // Clear existing timer
          if (logoutTimer) clearTimeout(logoutTimer);
          
          // Set new timer
          logoutTimer = setTimeout(() => {
            console.log('Token expired, auto logout');
            // You can dispatch logout or use a callback here
            store.dispatch(authSlice.actions.tokenExpired());
          }, timeUntilExpiry - 1000); // 1 second before expiry
        }
      }
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem('sidebar');
      
      // Clear timer
      if (logoutTimer) {
        clearTimeout(logoutTimer);
        logoutTimer = null;
      }
    },
    // New action for automatic token expiry
    tokenExpired: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = "Session expired. Please login again.";
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem('sidebar');
      
      if (logoutTimer) {
        clearTimeout(logoutTimer);
        logoutTimer = null;
      }
    },
    userUpdate: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    // Clear error action
    clearError: (state) => {
      state.error = null;
    }
  },
});

// Export actions (including the new ones)
export const { 
  loginStart, 
  loginSuccess, 
  userUpdate, 
  loginFailure, 
  logout,
  tokenExpired,
  clearError 
} = authSlice.actions;

// Thunk for checking token validity (call this periodically)
export const checkTokenValidity = () => (dispatch) => {
  const token = localStorage.getItem("token");
  
  if (!token || isTokenExpired(token)) {
    dispatch(tokenExpired());
    return false;
  }
  return true;
};

// Store reference (you'll need this for the timer)
let store;
export const setStore = (storeInstance) => {
  store = storeInstance;
};

export default authSlice.reducer;
