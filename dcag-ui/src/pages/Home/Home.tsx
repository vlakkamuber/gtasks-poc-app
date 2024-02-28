import { IonContent, IonPage } from '@ionic/react';

import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCategory } from '../../context/TaskCategoryContext';

import { Button, KIND, SHAPE, SIZE } from 'baseui/button';
import { DisplayXSmall, ParagraphMedium, LabelSmall } from 'baseui/typography';

import useAnalytics from '../../hooks/useAnanlytics';
import { ANALYTICS_PAGE, TASK_CATEGORIES_DATA, TasksOrder } from '../../constants/constant';
import React, { useEffect, useState } from 'react';
import apiService from '../../BE-services/apiService';
import { useUserAuth } from '../../context/UserAuthContext';
import TaskCard from './TaskCard';
import PageHeader from '../../components/PageHeader';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import EarningRingMessage from './EarningRingMessage';
import { useStyletron } from 'baseui';
import FlexBox from '../../components/FlexBox';
import Box from '../../components/Box';
import Page from '../../components/Page';
import { TaskCategoryType, TaskTypesType } from '../../types/tasks-types';
import useStyles from '../../hooks/useStyles';
import { STYLE_PAGES } from '../../hooks/constants';

const reshuffleTaskCategories = (tasks: TaskCategoryType[], order: TaskTypesType[]) => {
  const tasksByType: { [key: string]: TaskCategoryType[] } = {};
  order.forEach((type) => {
    tasksByType[type] = [];
  });
  tasks.forEach((task) => {
    if (tasksByType.hasOwnProperty(task.id)) {
      tasksByType[task.id].push(task);
    } else {
      console.warn(`Unknown task type: ${task.title}`);
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
  const [_, $theme] = useStyletron();
  const { taskHubSubTitleStyle } = useStyles(STYLE_PAGES.HOME);
  const { setSelectedCategory, location, setLocation } = useCategory();
  const { user } = useUserAuth();
  const logEvent = useAnalytics({ page: ANALYTICS_PAGE.home });
  const [taskCategories, setTaskCategories] = useState<TaskCategoryType[]>(
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

  const handleTaskCategory = (categoryId: string) => {
    if (categoryId === 'IMAGE_QUESTIONS') {
      categoryId = 'IMAGE_LABELLING';
    } else if (categoryId === 'MENU_QUESTIONS') {
      categoryId = 'MENU_PHOTO_REVIEW';
    }
    logEvent({
      actions: categoryId === 'ALL' ? 'click_view_all_tasks' : 'click_banner',
      properties: categoryId
    });
    // Set the selected category in localStorage
    localStorage.setItem('selectedCategory', categoryId);
    setSelectedCategory(categoryId);
    history.push('/dashboard/tasks');
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <Page>
          <PageHeader
            page={ANALYTICS_PAGE.home}
            title={t('dcag.home.bottomTabs.home')}
            showBackButton={false}
          />
          <Box mb={$theme.sizing.scale600}>
            <EarningRingMessage />
          </Box>
          <FlexBox justifyContent="space-between" alignItems="center">
            <DisplayXSmall>{t(`dcag.home.taskHub.title`)}</DisplayXSmall>
            <Button
              kind={KIND.secondary}
              onClick={() => handleTaskCategory('ALL')}
              shape={SHAPE.pill}
              size={SIZE.compact}>
              <LabelSmall>{t(`dcag.home.taskHub.btn.viewAllTasks`)}</LabelSmall>
            </Button>
          </FlexBox>
          <ParagraphMedium className={taskHubSubTitleStyle}>
            {t(`dcag.home.taskHub.subtitle`)}
          </ParagraphMedium>
          <FlexGrid flexGridColumnCount={2} flexGridColumnGap="scale500" flexGridRowGap="scale500">
            {taskCategories.map(
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
            )}
          </FlexGrid>
        </Page>
      </IonContent>
    </IonPage>
  );
};

export default Home;
