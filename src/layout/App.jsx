import React, { useState } from "react";
import { Container } from "semantic-ui-react";

import Dashboard from "../components/dashboard/Dashboard";
import Navbar from "../components/navbar/Navbar";

import "./styles.css";

function App() {
  const [formState, setFormState] = useState(false);

  return (
    <>
      <Navbar setFormState={setFormState} />
      <Container className="main">
        <Dashboard formState={formState} setFormState={setFormState} />
      </Container>
    </>
  );
}

export default App;
