// src/pages/Dashboard.tsx
import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from "@ionic/react";
import { home, schoolOutline, person, list } from "ionicons/icons";
import Home from "./Home";
import Training from "./Training";
import Account from "./Account";
import Tasks from "./Tasks";

const Dashboard: React.FC = ({content}) => {
  return (
    <IonTabs>
      <IonRouterOutlet>
      <Redirect exact from="/dashboard" to="/dashboard/home" />
        <Route path="/dashboard/home" render={() => <>{content}</>} />
        <Route path="/dashboard/training" render={() => <>{content}</>} />
        <Route path="/dashboard/tasks" render={() => <>{content}</>} forceRefresh={true}/>
        <Route path="/dashboard/account" render={() => <>{content}</>} forceRefresh={true}/>
        <Route path="/dashboard/help" render={() => <>{content}</>} forceRefresh={true}/>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/dashboard/home">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tasks" href="/dashboard/tasks">
          <IonIcon icon={list} />
          <IonLabel>Tasks</IonLabel>
        </IonTabButton>

        <IonTabButton tab="training" href="/dashboard/training">
          <IonIcon icon={schoolOutline} />
          <IonLabel>Training</IonLabel>
        </IonTabButton>

        
        <IonTabButton tab="account" href="/dashboard/account">
          <IonIcon icon={person} />
          <IonLabel>Account</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Dashboard;
