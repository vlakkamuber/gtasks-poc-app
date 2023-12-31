import { Redirect, Route } from 'react-router-dom';
import {
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';



/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import OTP from './pages/OTP';
import Home from './pages/Home';
import Training from './pages/Training';
import Account from './pages/Account';
import Tasks from './pages/Tasks';
import "./App.css"
import HomeScreen from './pages/HomeScreen';
import Completed from './pages/Completed';
import LoginSuccess from './pages/LoginSuccess';
import PerformTask2 from './pages/PerformTask2';
import Help from './pages/Help';
import { UserAuthContextProvider } from './context/UserAuthContext';
import LanguageSwitcher from './pages/LanguageSwitcher';
import { LanguageProvider } from './context/LanguageContext';
import i18n from './i18n';

setupIonicReact();

const App: React.FC = () => (
  // <LanguageProvider i18n={i18n}>
  <UserAuthContextProvider>

  <IonReactRouter>
    <IonRouterOutlet>
      <Route path="/home" component={HomeScreen} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/otp" component={OTP} exact />
      <Route path="/login-success" component={LoginSuccess} exact />
      <Route path="/dashboard" component={Dashboard} exact />
      <Route path="/dashboard/home" render={() => <Dashboard content={<Home />} />} exact />
      <Route path="/dashboard/training" render={() => <Dashboard content={<Training />} />} exact />
      <Route path="/dashboard/tasks" render={() => <Dashboard content={<Tasks />} />} exact/>
      <Route path="/dashboard/account" render={() => <Dashboard content={<Account />} />} exact/>
      <Route path="/dashboard/help" render={() => <Dashboard content={<Help />} />} exact/>
      <Route path="/dashboard/tasks/perform-task/:id" component={PerformTask2} exact />
      <Route path="/dashboard/tasks/completed" component={Completed} exact/>
      <Redirect exact from="/" to="/home" />
    </IonRouterOutlet>
  </IonReactRouter>
  </UserAuthContextProvider>
  // </LanguageProvider>
);

export default App;
