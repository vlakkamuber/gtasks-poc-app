// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonFab,
  IonFabButton
} from '@ionic/react';
import { home, school, person, list, warningSharp } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { useUserAuth } from '../context/UserAuthContext';
import { useHistory, useLocation } from 'react-router-dom';
import useAnalytics from '../hooks/useAnanlytics';
import { ANALYTICS_PAGE } from '../constants/constant';
import apiService from '../BE-services/apiService';
import AlertInfoCard from '../components/AlertInfoCard';

const Dashboard: React.FC = ({ content }) => {
  const { t } = useTranslation();
  const { user, loading } = useUserAuth();
  const logEvent = useAnalytics({ page: ANALYTICS_PAGE.navigation_bar });
  const history = useHistory();
  const location = useLocation();
  const [showFab, setShowFab] = useState(true);
  const [isAccountDisabled, setIsAccountDisabled] = useState(false);
  useEffect(() => {
    getUserByPhoneNumber();
  }, []);
  useEffect(() => {
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user.uid));
    }
  }, [user]);
  useEffect(() => {
    const isDashboardOrReport = location.pathname.includes('/dashboard/issue');
    setShowFab(!isDashboardOrReport);
  }, [location]);

  const goToReportBug = () => {
    logEvent({ actions: `click_report_bug` });
    history.push('/dashboard/issue');
  };
  const recordAnalytics = (properties: string) => {
    logEvent({ actions: `click_${properties}` });
  };
  const getUserByPhoneNumber = async () => {
    let userResponse = await apiService.verifyPhoneNumber(user.phoneNumber);
    setIsAccountDisabled(userResponse?.status === 'DISABLED' ? true : false);
  };
  return (
    <>
      {isAccountDisabled ? (
        <>
          <AlertInfoCard message="Thanks for being a part of our test phase for the app. We've finished the test now. Hope you enjoyed using it! We'll let you know when we are ready to start again." />
        </>
      ) : (
        <>
          {showFab && (
            <IonFab className="report-issue-fab" onClick={() => goToReportBug()}>
              <IonFabButton className="outline-fab-button">
                <IonIcon icon={warningSharp} />
              </IonFabButton>
            </IonFab>
          )}

          <IonTabs>
            <IonRouterOutlet>
              <Switch>
                <Redirect exact from="/dashboard" to="/dashboard/home" />
                <Route path="/dashboard/home" render={() => <>{content}</>} forceRefresh={true} />
                <Route path="/dashboard/training" render={() => <>{content}</>} />
                <Route path="/dashboard/tasks" render={() => <>{content}</>} forceRefresh={true} />
                <Route path="/dashboard/account" render={() => <>{content}</>} />
                <Route path="/dashboard/issue" render={() => <>{content}</>} />
                <Route path="/dashboard/help" render={() => <>{content}</>} />
              </Switch>
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton
                tab="home"
                href="/dashboard/home"
                onClick={() => recordAnalytics('home')}>
                <IonIcon icon={home} />
                <IonLabel>{t(`dcag.home.bottomTabs.home`)}</IonLabel>
              </IonTabButton>
              <IonTabButton
                tab="tasks"
                href="/dashboard/tasks"
                onClick={() => recordAnalytics('tasks')}>
                <IonIcon icon={list} />
                <IonLabel>{t(`dcag.home.bottomTabs.tasks`)}</IonLabel>
              </IonTabButton>

              <IonTabButton
                tab="training"
                href="/dashboard/training"
                onClick={() => recordAnalytics('training')}>
                <IonIcon icon={school} />
                <IonLabel>{t(`dcag.home.bottomTabs.training`)}</IonLabel>
              </IonTabButton>

              <IonTabButton
                tab="account"
                href="/dashboard/account"
                onClick={() => recordAnalytics('account')}>
                <IonIcon icon={person} />
                <IonLabel>{t(`dcag.home.bottomTabs.account`)}</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </>
      )}
    </>
  );
};

export default Dashboard;
