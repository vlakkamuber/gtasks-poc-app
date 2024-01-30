import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonIcon,
    IonLabel,
    IonToast
  } from '@ionic/react';


  import React, { useHistory } from 'react-router-dom';
  import { arrowBack } from 'ionicons/icons';
  import { useState } from 'react';

  import { Button, KIND } from 'baseui/button';
  import { Textarea } from 'baseui/textarea';

  import apiService from './apiService';
  import { useTranslation } from 'react-i18next';
  import { useUserAuth } from '../context/UserAuthContext';


  const ReportBug: React.FC = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const { user } = useUserAuth();

    const [description,setDescription] = useState("")
    const [submitted, setSubmitted] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const saveIssue = ()=>{
      let userId = JSON.parse(localStorage.getItem('loggedInUser'));
      let body = {
        description:description
      }
      apiService
        .saveIssue({ userId,body, user })
        .then((result) => {
          console.log(result);
          setShowLoading(false);
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
            history.push('/dashboard/account');
          }, 2000);
        })
        .catch((error) => {
          console.error('Error fetching task data:', error);
        });
    }

    const submitIssue = async (e)=>{
      e.preventDefault();
      setShowLoading(true)
      setSubmitted(true)
      saveIssue();
    }
    

    const goBack = () => {
        history.push('/dashboard/account'); // This function navigates back to the previous page
      };

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonIcon onClick={goBack} icon={arrowBack} className="clickable-cursor" />
            </IonButtons>
            <IonTitle className="ion-text-center">Report an issue</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
            <>
           
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                padding: '10px',
                margin: '20px'
              }}>
                 <h4>Report an issue</h4>
                 <p>We're always looking for ways to improve the app. If you've identified an issue, please report it by adding the details below. </p>
            <p>After receiving your report, our team will look into the concern. Please note our support team won't be able to provide status updates on reported issues.</p> 
                 <IonLabel className="label-with-margin" style={{ marginTop: '10px' }}>
                  Enter details of the issue  
        </IonLabel>
        <Textarea
                    value={description}
                    style={{ marginTop: '10px' }}
                    onChange={(e)=>setDescription(e.target.value)}
                    rows="2"
                    overrides={{

                      Root: {
                        style: () => ({
                          marginTop: '10px',
                          marginBottom:'10px'
                        })
                      }
                    }}
                  />
                   <div style={{display:'flex',flexDirection:'column',marginTop:'10px',gap:'15px'}}>
                    <Button kind={KIND.primary} disabled={submitted} onClick={(e)=>submitIssue(e)}>Submit</Button>
                    <Button kind={KIND.secondary} onClick={()=>goBack()}>Cancel</Button>
                   </div>
                </div>
                <IonToast
              isOpen={showToast}
              onDidDismiss={() => setShowToast(false)}
              message="Success! Task completed successfully."
              duration={5000}
              color="success"
              position="top"
              className="success-toast"
            />
            </>
       
        </IonContent>
      </IonPage>
    );
  };

  export default ReportBug;
