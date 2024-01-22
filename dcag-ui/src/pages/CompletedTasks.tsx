import { IonList, IonItem, IonBadge, IonLabel } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { chevronForward } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import apiService from './apiService';
import { filterTaskWithType, formatDate } from '../utils/mapTeluguDigitsToNumeric';
import LoadingComponent from '../components/Loader';
import { FILTER_OUT_TEXT_TO_AUDIO_TASK, TEXT_TO_AUDIO_TASK_TYPE } from '../constants/contant';
import MyTaskCard from './MyTaskCard';
import MyTaskCardList from './MyTaskCardList';

const CompletedTasks: React.FC = () => {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState([]);
  const [showLoading, setShowLoading] = useState(false);

  const history = useHistory();
  function groupBy(array, key) {
    return array.reduce((acc, item) => {
      const groupKey = item[key];
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(item);
      return acc;
    }, {});
  }
  const goBack = () => {
    history.goBack(); // This function navigates back to the previous page
  };
  const getMyTasksList = () => {
    let userId = JSON.parse(localStorage.getItem('loggedInUser'));
    apiService
      .getMyTasksList(userId)
      .then((res) => {
        setShowLoading(false);
        // temporary - this filter should be removed in future;
        let completedTasks = res.filter((task)=>{
          return task.status==='COMPLETED'
        })
        const result = FILTER_OUT_TEXT_TO_AUDIO_TASK
          ? filterTaskWithType(completedTasks, TEXT_TO_AUDIO_TASK_TYPE)
          : completedTasks;
        setTasks(groupBy(result, 'taskType'));
      })
      .catch((error) => {
        console.error('Error fetching task data:', error);
      });
  };

  useEffect(() => {
    setShowLoading(true);
    getMyTasksList();
  }, []);
  function groupBy(array, key) {
    return array.reduce((acc, item) => {
      const groupKey = item[key];
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(item);
      return acc;
    }, {});
  }
  return (
    <React.Fragment>
      <LoadingComponent showLoading={showLoading} onHide={() => setShowLoading(false)} />
      {Object.keys(tasks).map((key) => {
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
                  {t(`dcag.tasks.${key.replace(/\s+/g, '')}.title`)}
                </h1>
                {/* <span>View all</span> */}
              </div>

              <p style={{ margin: '0' }}>
                <small>{tasks[key][0].taskDesc}</small>
              </p>
            </div>
            <MyTaskCardList taskList={tasks[key]} />
          </>
        );
      })}
    </React.Fragment>
  );
};

export default CompletedTasks;
