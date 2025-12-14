import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import AddRecipe from "./components/AddRecipe";
import EditRecipe from "./components/EditRecipe";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar
        onSearch={(q) => setSearchQuery(q)}
        onReset={() => setSearchQuery("")}
      />
      <Routes>
        <Route path="/" element={<RecipeList searchQuery={searchQuery} />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/edit/:id" element={<EditRecipe />} />
      </Routes>
    </>
  );
}

export default App;
