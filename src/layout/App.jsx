import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Dashboard from "../components/dashboard/Dashboard";
import StartPage from "../components/startPage/StartPage";
import ItemDetail from "../components/itemDetailPage/ItemDetail";
import Navbar from "../components/navbar/Navbar";
import RightForm from "../components/rightSectionForm/RightForm";

import "./styles.css";
import Playground from "../components/playground/Playground";

function App() {
  const { key } = useLocation();

  return (
    <>
      <Route exact path="/" component={StartPage} />
      <Route
        path="(/.+)"
        render={() => (
          <Container className="main">
            <Navbar />
            <Switch>
              <Route path="/items/:id" component={ItemDetail} />
              <Route path="/items" component={Dashboard} />
              <Route path="/test" component={Playground} />
              <Route
                key={key}
                path={["/createItem", "/settings/:id"]}
                component={RightForm}
              />
            </Switch>
          </Container>
        )}
      />
    </>
  );
}

export default App;
