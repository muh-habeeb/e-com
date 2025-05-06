# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




``` js
//for checking user is still logged or not
 const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const expirationTime = localStorage.getItem("expirationTime");

if (userInfo && expirationTime) {
  if (new Date().getTime() > expirationTime) {
    // If session has expired, log the user out
    dispatch(logout());
  } else {
    // If session is still valid, proceed with the user info
    dispatch(setCredentials(userInfo));
  }
}
```