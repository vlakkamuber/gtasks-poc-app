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
import { useEffect, useState } from 'react';

import { Button, KIND } from 'baseui/button';
import { Textarea } from 'baseui/textarea';
import { Input } from 'baseui/input';
import { Select } from 'baseui/select';

import apiService from './apiService';
import { useTranslation } from 'react-i18next';
import { useUserAuth } from '../context/UserAuthContext';
import useAnalytics from '../hooks/useAnanlytics';
import { ANALYTICS_PAGE } from '../constants/constant';

const ReportBug: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { user } = useUserAuth();
  const logEvent = useAnalytics({ page: ANALYTICS_PAGE.report_bug });
  useEffect(() => {
    logEvent({ actions: '' });
  }, []);

  const [description, setDescription] = useState('');
  const [summary, setSummary] = useState('');
  const [taskType, setTaskType] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const taskTypes = [
    {
      label: 'General',
      id: 'GENERAL'
    },
    {
      id: 'RECORD_AUDIO',
      label: 'Record Audio'
    },
    {
      id: 'RECEIPT_DIGITIZATION',
      label: 'Receipt Digitization'
    },
    {
      id: 'LOCALIZATION_QUALITY',
      label: 'Language Quality'
    },
    {
      id: 'IMAGE_LABELLING',
      label: 'Image Labelling'
    },
    {
      id: 'MENU_PHOTO_REVIEW',
      label: 'Menu Photo Review'
    }
  ];

  const saveIssue = () => {
    let userId = JSON.parse(localStorage.getItem('loggedInUser'));
    let body = {
      description: description,
      summary: summary,
      type: taskType[0].id
    };
    apiService
      .saveIssue({ userId, body, user })
      .then((result) => {
        console.log(result);
        setShowLoading(false);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          history.push('/dashboard/tasks');
        }, 2000);
      })
      .catch((error) => {
        console.error('Error fetching task data:', error);
      });
  };

  const submitIssue = async (e) => {
    const otherDetails = JSON.stringify({
      description: description,
      summary: summary,
      type: taskType[0].id
    });
    logEvent({ actions: 'click_submit', otherDetails });
    e.preventDefault();
    setShowLoading(true);
    setSubmitted(true);
    saveIssue();
  };

  const goBack = () => {
    logEvent({ actions: 'click_go_back' });
    history.push('/dashboard/home'); // This function navigates back to the previous page
  };

  const onCancel = () => {
    logEvent({ actions: 'click_cancel' });
    goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonIcon onClick={goBack} icon={arrowBack} className="clickable-cursor" />
          </IonButtons>
          <IonTitle>Report an issue</IonTitle>
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
              margin: '20px',
              marginTop: '1px'
            }}>
            <p>
              We're always looking for ways to improve the app. If you've identified an issue,
              please report it by adding the details below.{' '}
            </p>
            <p>
              After receiving your report, our team will look into the concern. Please note our
              support team won't be able to provide status updates on reported issues.
            </p>
            <IonLabel className="label-with-margin" style={{ marginTop: '10px' }}>
              Task type
            </IonLabel>
            <Select
              style={{ marginTop: '10px' }}
              options={taskTypes}
              value={taskType}
              placeholder="Select task type"
              onChange={(params) => setTaskType(params.value)}
              overrides={{
                Root: {
                  style: () => ({
                    marginTop: '10px',
                    marginBottom: '10px'
                  })
                }
              }}
            />
            <IonLabel className="label-with-margin" style={{ marginTop: '10px' }}>
              Summary
            </IonLabel>
            <Input
              value={summary}
              placeholder="Enter summary of the issue"
              overrides={{
                Root: {
                  style: () => ({
                    marginTop: '10px',
                    marginBottom: '10px'
                  })
                }
              }}
              onChange={(e) => setSummary(e.target.value)}
            />
            <IonLabel className="label-with-margin" style={{ marginTop: '10px' }}>
              Details
            </IonLabel>
            <Textarea
              value={description}
              placeholder="Please add details to help us understand the issue"
              style={{ marginTop: '10px' }}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              overrides={{
                Root: {
                  style: () => ({
                    marginTop: '10px',
                    marginBottom: '10px'
                  })
                }
              }}
            />
            <div
              style={{ display: 'flex', flexDirection: 'column', marginTop: '10px', gap: '15px' }}>
              <Button
                kind={KIND.primary}
                disabled={submitted || !summary.length || !description.length || !taskType}
                onClick={(e) => submitIssue(e)}>
                Submit
              </Button>
              <Button kind={KIND.secondary} onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </div>
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message="Success! Issue submitted successfully."
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
