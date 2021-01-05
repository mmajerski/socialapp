import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Dashboard from "../components/dashboard/Dashboard";
import StartPage from "../components/startPage/StartPage";
import ItemDetailPage from "../components/itemDetailPage/ItemDetailPage";
import Navbar from "../components/navbar/Navbar";
import RightForm from "../components/rightSectionForm/RightForm";

import "./styles.css";

function App() {
  return (
    <Router>
      <Route exact path="/" component={StartPage} />
      <Route
        path="(/.+)"
        render={() => (
          <Container className="main">
            <Navbar />
            <Switch>
              <Route path="/items/:id" component={ItemDetailPage} />
              <Route path="/items" component={Dashboard} />
              <Route
                path={["/createItem", "/settings/:id"]}
                component={RightForm}
              />
            </Switch>
          </Container>
        )}
      />
    </Router>
  );
}

export default App;
