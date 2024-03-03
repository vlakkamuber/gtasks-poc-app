import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ErrorView from '../../../components/ErrorView';
import { useTranslation } from 'react-i18next';

const EmptyPageWithLoader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t(`dcag.tasks.page.heading`)}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding-start" style={{ '--padding-bottom': '77px' }}>
        <ErrorView />
      </IonContent>
    </IonPage>
  );
};

export default EmptyPageWithLoader;
