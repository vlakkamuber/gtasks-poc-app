import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, home, square, triangle } from 'ionicons/icons';
// import Tab1 from './pages/Tab1';
// import Tab2 from './pages/Tab2';
// import Tab3 from './pages/Tab3';

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
import PerformTask from './pages/PerformTask';
import Completed from './pages/Completed';
import LoginSuccess from './pages/LoginSuccess';
import PerformTask2 from './pages/PerformTask2';

setupIonicReact();

const App: React.FC = () => (
  <IonReactRouter>
    <IonRouterOutlet>
      <Route path="/home" component={HomeScreen} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/otp" component={OTP} exact />
      <Route path="/login-success" component={LoginSuccess} exact />
      <Route path="/dashboard" component={Dashboard} exact />
      <Route path="/dashboard/home" render={() => <Dashboard content={<Home />} />} exact />
      <Route path="/dashboard/training" render={() => <Dashboard content={<Training />} />} exact />
      <Route path="/dashboard/tasks" render={() => <Dashboard content={<Tasks />} />} exact forceRefresh={true}/>
      <Route path="/dashboard/account" render={() => <Dashboard content={<Account />} />} exact forceRefresh={true}/>
      <Route path="/dashboard/tasks/perform-task/:id" component={PerformTask2} exact forceRefresh={true}/>
      <Route path="/dashboard/tasks/completed" component={Completed} exact forceRefresh={true}/>
      <Redirect exact from="/" to="/home" />
    </IonRouterOutlet>
  </IonReactRouter>
);

export default App;
