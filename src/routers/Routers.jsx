import React from "react";

import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Family from "../pages/Family";
import ReadNew from "../pages/ReadNew";
import Account from "../pages/Account";
import Author from "../pages/Author";
// import Admin from "../pages/Admin";
import AdminDashboard from "../pages/AdminDashboard";
import Profile from "../pages/Profile";
import Message from "../pages/Message";
import EditProfile from "../pages/EditProfile";

import AuthProvider from "../Context/AuthProvider";

const Routers = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/family" exact component={Family} />
        <Route path="/article/" component={ReadNew} />
        <Route path="/profile/" exact component={Profile} />
        <Route path="/message/" exact component={Message} />
        <Route path="/postnew/" exact component={Author} />
        <Route path="/profile/edit/" exact component={EditProfile} />
        <AuthProvider>
          <Route path="/account" exact component={Account} />
          {/* <Route path="/account/admin" exact component={Admin} /> */}
          <Route path="/admindashboard" exact component={AdminDashboard} />
        </AuthProvider>
      </Switch>
    </div>
  );
};

export default Routers;
