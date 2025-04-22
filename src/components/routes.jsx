import Home from "../pages/home";
import About from "../pages/about";

// export const routes = [
//   { path: "/", component: Home },
//   { path: "/about", component: About },
// ];

export const routes = {
  "/": {component: Home, subRoutes: ["/about"], parent: null},
  "/about": {component: About, subRoutes: [], parent: "/"}
}