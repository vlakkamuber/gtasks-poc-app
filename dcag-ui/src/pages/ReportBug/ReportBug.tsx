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

import apiService from '../../BE-services/apiService';
import { useTranslation } from 'react-i18next';
import { useUserAuth } from '../../context/UserAuthContext';
import useAnalytics from '../../hooks/useAnanlytics';
import { ANALYTICS_PAGE } from '../../constants/constant';
import PageHeader from '../../components/PageHeader/PageHeader';

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
      type: taskType
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
      type: taskType
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

  const handleTaskTypeChange = (e) => {
    setTaskType(e.target.value);
  };

  return (
    <IonPage>
      <PageHeader page={ANALYTICS_PAGE.report_bug} title={t('dcag.pages.reportAnIssue.title')} />
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
            <p>{t('dcag.pages.reportAnIssue.paragraph1')} </p>
            <p>{t('dcag.pages.reportAnIssue.paragraph2')}</p>
            <IonLabel className="label-with-margin" style={{ marginTop: '10px' }}>
              {t('dcag.pages.reportAnIssue.taskType.label')}
            </IonLabel>
            {/* <Select
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
            /> */}
            <select
              onChange={handleTaskTypeChange}
              className={taskType ? '' : 'muted-text'}
              style={{
                marginTop: '10px',
                marginBottom: '10px'
              }}>
              <option value="" disabled selected hidden>
                {t('dcag.pages.reportAnIssue.taskType.options.default')}
              </option>
              {taskTypes.map((item) => (
                <option value={item.id}>
                  {t(`dcag.pages.reportAnIssue.taskType.options.${item.id}`)}
                </option>
              ))}
            </select>
            <IonLabel className="label-with-margin" style={{ marginTop: '10px' }}>
              {t('dcag.pages.reportAnIssue.summary.label')}
            </IonLabel>
            <Input
              value={summary}
              placeholder={t('dcag.pages.reportAnIssue.summary.placeholder')}
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
              {t('dcag.pages.reportAnIssue.details.label')}
            </IonLabel>
            <Textarea
              value={description}
              placeholder={t('dcag.pages.reportAnIssue.details.placeholder')}
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
                {t('dcag.pages.reportAnIssue.submitButton')}
              </Button>
              <Button kind={KIND.secondary} onClick={onCancel}>
                {t('dcag.pages.reportAnIssue.cancelButton')}
              </Button>
            </div>
          </div>
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={t('dcag.pages.reportAnIssue.successMessage')}
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
