import {routes} from "./routes.jsx";
import { useLocation } from 'wouter';

// const navigate = useNavigate();

export const commands = {
  help: () => `Available commands: ${Object.keys(commands).join(', ')}`,
  clear: () => 'CLEAR_SCREEN',
  about: () => `I'm Alaap, a full-stack developer with a focus on backend, AI, and scalable systems.`,
  skills: () => `Languages: Python, JS, PHP | Web: Angular, Node.js, REST | DB: MySQL, PostgreSQL | ML: NLP, TensorFlow`,
  projects: () => `- Healthcare CRM\n- Trade Finance AI\n- CLI Portfolio`,
  experience: () => `- Sr. Software Developer, AiEdge (2021–2023)\n- Intern, AiEdge (2020)`,
  education: () => `- M.Sc. Intelligent Systems and Robotics, De Montfort\n- B.Tech Mechatronics, SRMIST`,
  contact: () => `Email: alaap.sarkar@gmail.com | GitHub: github.com/AlaapSarkar | LinkedIn: alaapsarkar`,
  ls: (state) => {
    let input = state.path
    if (state.input !== undefined) {
      input = state.input
    }
    console.log(input)
    return routes[input].subRoutes.length===0?"No sub routes":`Routes: ${routes[input].subRoutes.join(', ')}`
  },
  cd: (state) => {
    const [location, setLocation] = useLocation();
    if (state.input in routes) {}
  }
};