import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "../components/dashboard/Dashboard";
import StartPage from "../components/startPage/StartPage";
import ItemDetail from "../components/itemDetailPage/ItemDetail";
import Navbar from "../components/navbar/Navbar";
import RightForm from "../components/rightSectionForm/RightForm";

import "./styles.css";
import Playground from "../components/playground/Playground";
import ModalHandler from "../components/modal/ModalHandler";
import Error from "../components/error/Error";
import Account from "../components/auth/Account";
import ProfileContainer from "../components/userProfile/ProfileContainer";

function App() {
  const { key } = useLocation();

  return (
    <>
      <ModalHandler />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
              <Route path="/account" component={Account} />
              <Route path="/profile/:id" component={ProfileContainer} />
              <Route path="/error" component={Error} />
            </Switch>
          </Container>
        )}
      />
    </>
  );
}

export default App;
