// src/pages/Dashboard.tsx
import React, {useState,useEffect} from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonFab,
  IonFabButton,
} from "@ionic/react";
import { home, schoolOutline, person, list,warningSharp } from "ionicons/icons";
import { useTranslation } from 'react-i18next';
import { useUserAuth } from "../context/UserAuthContext";
import { useHistory,useLocation } from "react-router-dom";

const Dashboard: React.FC = ({content}) => {
  const { t } = useTranslation();
  const { user, loading } = useUserAuth();
  const history = useHistory()
  const location = useLocation();
  const [showFab, setShowFab] = useState(true);
  useEffect(() => {
    if (user) {
      localStorage.setItem("loggedInUser",JSON.stringify(user.uid))
    }
  }, [user])
  useEffect(() => {
    const isDashboardOrReport = location.pathname.includes("/dashboard/issue");
    setShowFab(!isDashboardOrReport);
  }, [location]);

  const goToReportBug = ()=>{
    history.push("/dashboard/issue");
  }
  return (
    <>
   {showFab && ( <IonFab className="report-issue-fab" onClick={()=>goToReportBug()}>
        <IonFabButton className="outline-fab-button">
          <IonIcon icon={warningSharp} />
        </IonFabButton>
      </IonFab>)}
   
    <IonTabs>
      <IonRouterOutlet>
      <Redirect exact from="/dashboard" to="/dashboard/home" />
        <Route path="/dashboard/home" render={() => <>{content}</>} forceRefresh={true}/>
        <Route path="/dashboard/training" render={() => <>{content}</>} />
        <Route path="/dashboard/tasks" render={() => <>{content}</>} forceRefresh={true}/>
        <Route path="/dashboard/account" render={() => <>{content}</>}/>
        <Route path="/dashboard/issue" render={() => <>{content}</>}/>
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
    </>
  );
};

export default Dashboard;
