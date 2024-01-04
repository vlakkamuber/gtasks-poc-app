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
import { useTranslation } from 'react-i18next';

const Dashboard: React.FC = ({content}) => {
  const { t } = useTranslation();
  return (
    <IonTabs>
      <IonRouterOutlet>
      <Redirect exact from="/dashboard" to="/dashboard/home" />
        <Route path="/dashboard/home" render={() => <>{content}</>} />
        <Route path="/dashboard/training" render={() => <>{content}</>} />
        <Route path="/dashboard/tasks" render={() => <>{content}</>}/>
        <Route path="/dashboard/account" render={() => <>{content}</>}/>
        <Route path="/dashboard/help" render={() => <>{content}</>}/>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/dashboard/home">
          <IonIcon icon={home} />
          <IonLabel>{t(`dcag.home.bottomTabs.home`)}</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tasks" href="/dashboard/tasks">
          <IonIcon icon={list} />
          <IonLabel>{t(`dcag.home.bottomTabs.tasks`)}</IonLabel>
        </IonTabButton>

        <IonTabButton tab="training" href="/dashboard/training">
          <IonIcon icon={schoolOutline} />
          <IonLabel>{t(`dcag.home.bottomTabs.training`)}</IonLabel>
        </IonTabButton>

        
        <IonTabButton tab="account" href="/dashboard/account">
          <IonIcon icon={person} />
          <IonLabel>{t(`dcag.home.bottomTabs.account`)}</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Dashboard;
