import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Route, Switch, Router } from 'wouter';
// import {commands} from "./commands.jsx";

function Terminal({ commands = {} }) {
  const [location] = useLocation();
  
  const path = location;
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  // useEffect(() => {
  //   const text = routes[path] || "Welcome! Use 'help' to begin.";
  //   setHistory([{ cmd: '', output: text }]);
  // }, [path]);

  const handleCommand = (e) => {
    // console.log(e)
    if (e.key === 'Enter') {
      const cmd = input.trim();
      const cmd_split = cmd.split(" ")
      const baseCmd = cmd_split[0].toLowerCase();
      let state = {path: path}
      if (cmd_split.length >= 2) {
        state["input"] = cmd_split.slice(1).join(" ")
      }

      let output = commands[baseCmd]?.(state) || `Command not found: ${baseCmd}`;

        // output = commands[baseCmd]?.() || `Command not found: ${baseCmd}`;

      setHistory((prev) =>
        output === 'CLEAR_SCREEN' ? [] : [...prev, { cmd, output }]
      );
      setCommandHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      if (commandHistory.length === 0) return;
      const index = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setInput(commandHistory[index]);
      setHistoryIndex(index);
    } else if (e.key === 'ArrowDown') {
      if (commandHistory.length === 0) return;
      const index = historyIndex === -1 ? commandHistory.length - 1 : Math.min(commandHistory.length - 1, historyIndex + 1);
      setInput(commandHistory[index]);
      setHistoryIndex(index);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [input]);
  
  useEffect(() => {
    // console.log(outputRef.current)
    outputRef.current?.scrollTo(0, outputRef.current.scrollHeight);
  }, [history]);

  return (
    <div className="terminal" ref={outputRef}>
      <div className="terminal-output">
        {history.map((entry, i) => (
          <div key={i}>
            {entry.cmd && <div className="prompt-line"><Prompt path={path} />{entry.cmd}</div>}
            <Typewriter text={entry.output} />
          </div>
        ))}
      </div>
      <div className="terminal-input">
        <Prompt path={path} />
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          autoFocus
        />
      </div>
    </div>
  );
}

function Prompt({ path }) {
  return (
    <span className="prompt">
      <span className="user">visitor</span>
      <span className="colon">:</span>
      <span className="path">{path}</span>
      <span className="symbol">$ </span>
    </span>
  );
}

function Typewriter({ text }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 10);
    return () => clearInterval(interval);
  }, [text]);
  return <pre>{displayed}</pre>;
}

export default Terminal;