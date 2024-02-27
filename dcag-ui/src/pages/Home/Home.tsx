import { IonContent, IonPage } from '@ionic/react';

import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCategory } from '../../context/TaskCategoryContext';
import { ArrowRight, ArrowLeft } from 'baseui/icon';

import { Button, KIND, SHAPE, SIZE } from 'baseui/button';
import { Block } from 'baseui/block';
import { DisplayXSmall, ParagraphMedium, LabelSmall, LabelMedium } from 'baseui/typography';

import useAnalytics from '../../hooks/useAnanlytics';
import { ANALYTICS_PAGE, TASK_CATEGORIES_DATA, TASK_RATE } from '../../constants/constant';
import React, { useEffect, useState } from 'react';
import apiService from '../../BE-services/apiService';
import { useUserAuth } from '../../context/UserAuthContext';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import TaskCard from './TaskCard';
import PageHeader from '../../components/PageHeader';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';

const reshuffleTaskCategories = (tasks, order) => {
  const tasksByType = {};
  order.forEach((type) => {
    tasksByType[type] = [];
  });
  tasks.forEach((task) => {
    if (tasksByType.hasOwnProperty(task.id)) {
      tasksByType[task.id].push(task);
    } else {
      console.warn(`Unknown task type: ${task.taskType}`);
    }
  });
  const orderedTasks = order.reduce((accumulator, id) => {
    return accumulator.concat(tasksByType[id]);
  }, []);

  return orderedTasks;
};
const Home: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { selectedCategory, setSelectedCategory, location, setLocation } = useCategory();
  const { user } = useUserAuth();
  const logEvent = useAnalytics({ page: ANALYTICS_PAGE.home });
  const [taskCategories, setTaskCategories] = useState(
    location === 'DELHI' || location === 'PUNE'
      ? reshuffleTaskCategories(TASK_CATEGORIES_DATA, [
          'IMAGE_LABELLING',
          'MENU_PHOTO_REVIEW',
          'LOCALIZATION_QUALITY',
          'RECEIPT_DIGITIZATION',
          'RECORD_AUDIO'
        ])
      : TASK_CATEGORIES_DATA
  );

  const getUserByPhoneNumber = async () => {
    let userResponse = await apiService.verifyPhoneNumber(user.phoneNumber);
    localStorage.setItem('location', userResponse.cityName);
    setLocation(userResponse.cityName);
  };

  useEffect(() => {
    logEvent({ actions: '' });
    getUserByPhoneNumber();
    //Update task categories based on location
    if (location === 'CHENNAI' || location === 'HYDERABAD') {
      const updatedCategories = taskCategories.map((category) => {
        if (category.id === 'IMAGE_LABELLING' || category.id === 'MENU_PHOTO_REVIEW') {
          return {
            ...category,
            id: category.id === 'IMAGE_LABELLING' ? 'IMAGE_QUESTIONS' : 'MENU_QUESTIONS',
            title: t(`dcag.home.taskHub.${category.id}.title`),
            show: true
          };
        }
        return category;
      });
      setTaskCategories(updatedCategories);
    }
  }, []);

  const handleTaskCategory = (category) => {
    if (category === 'IMAGE_QUESTIONS') {
      category = 'IMAGE_LABELLING';
    } else if (category === 'MENU_QUESTIONS') {
      category = 'MENU_PHOTO_REVIEW';
    }
    logEvent({
      actions: category === 'ALL' ? 'click_view_all_tasks' : 'click_banner',
      properties: category
    });
    // Set the selected category in localStorage
    localStorage.setItem('selectedCategory', category);
    setSelectedCategory(category);
    history.push('/dashboard/tasks');
  };

  const goBack = () => {
    logEvent({ actions: 'click_go_back' });
    history.goBack(); // This function navigates back to the previous page
  };
  const renderTaskCards = () => {
    return taskCategories.map(
      (category) =>
        category.show && (
          <FlexGridItem>
            <TaskCard
              key={category.id}
              category={category}
              handleTaskCategory={handleTaskCategory}
            />
          </FlexGridItem>
        )
    );
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="p-16">
          <PageHeader
            page={ANALYTICS_PAGE.home}
            title={t('dcag.home.bottomTabs.home')}
            showBackButton={false}
          />
          <div className="fixed-header-home-content">
            <div>
              <DisplayXSmall>{t(`dcag.home.taskHub.title`)}</DisplayXSmall>
            </div>
            <Button
              kind={KIND.secondary}
              onClick={() => handleTaskCategory('ALL')}
              shape={SHAPE.pill}
              size={SIZE.compact}>
              <LabelSmall>{t(`dcag.home.taskHub.btn.viewAllTasks`)}</LabelSmall>
            </Button>
          </div>
          <ParagraphMedium className="mt-4 mb-32">
            {t(`dcag.home.taskHub.subtitle`)}
          </ParagraphMedium>
          <div className="mt-16 mb-0">
            <FlexGrid
              flexGridColumnCount={2}
              flexGridColumnGap="scale500"
              flexGridRowGap="scale500">
              {renderTaskCards()}
            </FlexGrid>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
