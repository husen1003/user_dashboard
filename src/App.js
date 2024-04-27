import { Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import AppContextProvider from "./components/AppContext";

function App() {
  return (
    <AppContextProvider>
      <div className="text-white bg-gray-800 min-h-screen">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user-details" element={<UserForm />} />
        </Routes>
      </div>
    </AppContextProvider>
  );
}

export default App;
