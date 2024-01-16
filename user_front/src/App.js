import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Inbox, Login, Compose, View } from "./views";
import { AppContextProvider } from "./context/app.context.js";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContextProvider>
          <Routes>
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/login" element={<Login />} />
            <Route path="/compose" element={<Compose />} />
            <Route path="/view/:id" element={<View />} />
            <Route path="*" element={<Inbox />} />
          </Routes>
        </AppContextProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
