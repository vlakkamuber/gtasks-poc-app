import React from 'react';
import TaskSwitcher from '../TaskSwitcher';
import { useTranslation } from 'react-i18next';
import { IonButton, IonItem, IonLabel, IonList } from '@ionic/react';
import { TagFilled } from '@uber/icons';

const ImageUploadTasksList: React.FC<{
  selectedCategory: string;
  showPayout: boolean;
  goToUploadImageTask: () => void;
}> = ({ selectedCategory, showPayout, goToUploadImageTask }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="ion-padding">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <h1 style={{ margin: '0', marginBottom: '-4px' }}>
            {t(`dcag.tasks.UPLOAD_IMAGE.title`)}
          </h1>
          {selectedCategory !== 'ALL' && (
            <div style={{ width: '60%' }}>
              <TaskSwitcher />
            </div>
          )}
          {/* <span style={{ color: "#467ff4" }}>
            {tasks[key].length} {t(`dcag.home.btn.new.label`)}
          </span> */}
        </div>

        <p style={{ margin: '0' }}>
          <small>{t(`dcag.tasks.UPLOAD_IMAGE.taskDesc`)}.</small>
        </p>
      </div>
      <IonList style={{ marginBottom: 1 }}>
        <IonItem>
          <IonLabel>
            <span style={{ display: 'flex' }}>
              <h2>Default Task</h2>
            </span>
            {showPayout && (
              <p>
                <TagFilled color={'#0E8345'} style={{ marginRight: 4 }} /> $2
              </p>
            )}
          </IonLabel>
          <IonButton
            slot="end"
            style={{
              '--background': 'black',
              '--border-radius': '10px'
            }}
            onClick={() => goToUploadImageTask()}>
            {t(`dcag.home.btn.startWork.label`)}
          </IonButton>
        </IonItem>
      </IonList>
    </>
  );
};

export default ImageUploadTasksList;
