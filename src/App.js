import { Box } from "@mui/material";
import "./App.css";
import NavBar from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./homepage/homePage";
import Login from "./login/Login";
import Register  from "./register/Register";
import { AccountSettings } from "./accountSettings/AccountSettings";
import { JobOffers } from "./jobOffers/JobOffers";
import UserJobOffer from "./userJobOffer/UserJobOffer";
import { AddJobOffer } from "./addJobOffer/AddJobOffer";
import { JobOfferDetails } from "./jobOfferDetails/JobOfferDetails";
import { EditOffer } from "./editOffer/EditOffer";

import { Provider } from "react-redux";
import store from "./store";
import Layout from "./hocs/Layout";
import ResetPassword from "./resetPassword/ResetPassword";
import ResetPasswordConfirm from './resetPassword/ResetPasswordConfirm';
import Activate from "./activate/Activate";

function App() {
  return (
      <Provider store={store}>
        <Layout>
          <Routes>
            <Route exact path="/" element={<UserJobOffer  />} />
            <Route exact path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/settings" element={<AccountSettings />} />
            <Route path="/allOffers" element={<JobOffers />} />
            <Route path="/userOffers" element={<HomePage />} />
            <Route path="/addJobOffer" element={<AddJobOffer />} />
            <Route path="/offerDetails/:id" element={<JobOfferDetails />} />
            <Route path="/addOffer" element={<AddJobOffer />} />
            <Route path="/editOffer/:id" element={<EditOffer />} />
            <Route path="/resetPassword" element={<ResetPassword/>} />
            <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm/>} />
            <Route path="/verifyAccount/:iud/:token" element={<Activate/>} />
          </Routes>
        </Layout>
      </Provider>
  );
}

export default App;
