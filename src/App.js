import { createContext, useEffect, useState } from 'react';
import './App.css';
import LoginPopup from './components/LoginPopup/LoginPopup';
import TodoList from './components/TodoList/TodoList';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [timedPopup, setTimedPopup] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTimedPopup(true)
    }, 2000);
  }, []);

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      <div className="todo-app">
        <TodoList showPopup={setShowPopup} />
      </div>
      <LoginPopup showPopup={showPopup} onClose={() => setShowPopup(false)} />
      <LoginPopup showPopup={timedPopup} onClose={() => setTimedPopup(false)} />
    </UserContext.Provider>
  );
}

export default App;
