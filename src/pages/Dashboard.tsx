// src/pages/Dashboard.tsx
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel,IonRouterOutlet } from '@ionic/react';
import { home, train, person, list } from 'ionicons/icons';
import Home from './Home';
import Training from './Training';
import Account from './Account';
import Tasks from './Tasks';

const Dashboard: React.FC = () => {
  return (
    <IonTabs>
       <IonRouterOutlet>
       <Route path="/dashboard/home" component={Home} />
      <Route path="/dashboard/training" component={Training} />
      <Route path="/dashboard/account" component={Account} />
      <Route path="/dashboard/tasks" component={Tasks} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/dashboard/home">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton tab="training" href="/dashboard/training">
          <IonIcon icon={train} />
          <IonLabel>Training</IonLabel>
        </IonTabButton>

        <IonTabButton tab="account" href="/dashboard/account">
          <IonIcon icon={person} />
          <IonLabel>Account</IonLabel>
        </IonTabButton>

        <IonTabButton tab="tasks" href="/dashboard/tasks">
          <IonIcon icon={list} />
          <IonLabel>Tasks</IonLabel>
        </IonTabButton>
      </IonTabBar>
     
    </IonTabs>
  );
};

export default Dashboard;
