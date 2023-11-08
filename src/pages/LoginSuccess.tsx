import {
    IonContent,
    IonPage,
    IonButton,
  } from "@ionic/react";
  import { useHistory } from 'react-router-dom';
  
  const LoginSuccess: React.FC = () => {
      const history = useHistory()
      const goToHome = ()=>{
          history.push("/dashboard/home")
      }
    return (
      <IonPage>
        <IonContent fullscreen>
          <IonContent>
            <div className="center-content">
              <img src="../../public/assets/completed-right-tick.jpeg" width="30%"/>
              <h2 style={{margin:'0'}}>Thanks,</h2>
              <h2 style={{margin:'0'}}>ABC!</h2>
              <p style={{margin:'0'}}>Your account has been created</p>
              <div className="button-container-completed">
                <IonButton expand="full" color="primary" style={{width:'100%',height:'40px'}} onClick={()=>goToHome()}>Continue</IonButton>
              </div>
            </div>
          </IonContent>
        </IonContent>
      </IonPage>
    );
  };
  
  export default LoginSuccess;