import "./App.css";
import Navbar from "./Components/Navbar.jsx";
import Hero from "./Components/Hero.jsx";
import Record from "./Components/Record.jsx";
import History from "./Components/History.jsx";
import transactionData from "./Data/db.json";
import { useState } from "react";

function App() {
  const { Transaction } = transactionData;

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Navbar />
      <Hero />
      <Record />
      <History Database={Transaction} searchQuery={searchQuery} />
    </>
  );
}

export default App;
