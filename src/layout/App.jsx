import React, { useState } from "react";
import { Container } from "semantic-ui-react";

import Dashboard from "../components/dashboard/Dashboard";
import Navbar from "../components/navbar/Navbar";

import "./styles.css";

function App() {
  const [formState, setFormState] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectItem = (e) => {
    setSelectedItem(e);
    setFormState(true);
  };

  const handleClearForm = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <Navbar setFormState={setFormState} />
      <Container className="main">
        <Dashboard
          formState={formState}
          setFormState={setFormState}
          selectItem={handleSelectItem}
          selectedItem={selectedItem}
          clearForm={handleClearForm}
        />
      </Container>
    </>
  );
}

export default App;
