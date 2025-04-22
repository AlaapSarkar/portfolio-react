import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Route, Switch, Router } from 'wouter';
// import { navigate } from 'wouter/use-browser-location';
// import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
/**
 * This code defines the react app
 *
 * Imports the router functionality to provide page navigation
 * Defines the Home function outlining the content on each page
 * Content specific to each page (Home and About) is defined in their components in /pages
 * Each page content is presented inside the overall structure defined here
 * The router attaches the page components to their paths
 */

// Import and apply CSS stylesheet
import "./styles/styles.css";

// Where all of our pages come from
import PageRouter from "./components/router.jsx";

// The component that adds our Meta tags to the page
import Seo from "./components/seo.jsx";

import Terminal from "./components/terminal.jsx";
import {commands} from "./components/commands.jsx";

// commands
// const routes = {
//   '/': "Welcome to my CLI-style portfolio. Type 'help' to get started.",
//   '/about': "This is the about section. Learn more with the 'about' command.",
//   '/projects': "Welcome to projects. Type 'projects' to see work examples.",
//   '/skills': "You're in the skills section. Type 'skills' to list them.",
//   '/experience': "Explore my work history with 'experience'.",
//   '/education': "Here's my academic background. Type 'education'.",
//   '/contact': "Need to reach me? Try the 'contact' command."
// };

function App() {
  return (
    <Router>
      <PageRouter/>
      <Terminal commands={commands}/>
    </Router>
  );
}

export default App;
