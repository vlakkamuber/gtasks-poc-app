import React, { useState } from 'react';
import NoTasksAvailable from './NoTasksAvailable';
import AlertInfoCard from '../../../components/AlertInfoCard';
import TaskSwitcher from '../TaskSwitcher';
import TaskList from './TaskList';
import ImageUploadTasksList from './ImageUploadTasksList';
import { useTranslation } from 'react-i18next';
import type { Task, goToPerformTaskFunctionType } from '../../../types/tasks-types';
import {
  TASK_CATEGORIES_DATA,
  TaskOrderByLocation,
  taskCategoriesToShow
} from '../../../constants/constant';

const AvailableTasksSegment: React.FC<{
  myTasks: Task[];
  location: keyof typeof TaskOrderByLocation;
  showLoading: boolean;
  completedCount: number;
  selectedCategory: keyof typeof taskCategoriesToShow | 'ALL';
  todayEarnings: number;
  showPayout: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  goToPerformTask: goToPerformTaskFunctionType;
  goToPerformResumeWork: goToPerformTaskFunctionType;
  goToUploadImageTask: () => void;
  isImageUploadAvailable: boolean;
}> = ({
  location,
  showLoading,
  completedCount,
  selectedCategory,
  todayEarnings,
  showPayout,
  goToPerformTask,
  goToPerformResumeWork,
  setIsError,
  myTasks,
  goToUploadImageTask,
  isImageUploadAvailable
}) => {
  const { t } = useTranslation();
  const [availableCountByCategory, setAvailableCountByCategory] = useState<Record<string, number>>(
    {}
  );

  const selectedCategoryTitle = TASK_CATEGORIES_DATA.find(
    (item) => item.id === selectedCategory
  )?.title;

  const selectedTaskType = TASK_CATEGORIES_DATA.find((item) => item.id === selectedCategory);

  const taskCategories: Array<keyof typeof taskCategoriesToShow> = (
    selectedCategory !== 'ALL'
      ? [selectedCategory]
      : TaskOrderByLocation[location] || TaskOrderByLocation.OTHER
  ).filter((category: keyof typeof taskCategoriesToShow) => taskCategoriesToShow[category]);

  return (
    <React.Fragment>
      {availableCountByCategory[selectedCategory] === 0 && !showLoading && (
        <NoTasksAvailable
          completedCount={completedCount}
          selectedCategoryTitle={selectedCategoryTitle}
        />
      )}
      {todayEarnings > 200 ? (
        <AlertInfoCard message="You reached the daily earning limit of Rs.200! Please continue tomorrow!" />
      ) : (
        <>
          <React.Fragment>
            {taskCategories.map((category) => {
              return (
                <React.Fragment key={category}>
                  <div className="ion-padding">
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                      <h1 style={{ margin: '0', marginBottom: '-4px' }}>
                        {(location === 'HYDERABAD' || location === 'CHENNAI') &&
                        (category === 'IMAGE_LABELLING' || category === 'MENU_PHOTO_REVIEW')
                          ? t(`dcag.tasks.${category}.CHENNAI_HYD.title`)
                          : t(`dcag.tasks.${category}.title`)}
                      </h1>
                      {selectedCategory !== 'ALL' && (
                        <span>
                          <TaskSwitcher />
                        </span>
                      )}
                      {/* <span style={{ color: "#467ff4" }}>
                    {tasks[key].length} {t(`dcag.home.btn.new.label`)}
                  </span> */}
                    </div>

                    <p style={{ margin: '0' }}>
                      {availableCountByCategory[selectedCategory] === 0 ? (
                        <small>
                          {completedCount > 0
                            ? t('dcag.tasks.text.all_task_completed')
                            : t('dcag.tasks.text.no_more_task')}{' '}
                          {selectedTaskType?.title}. {t('dcag.tasks.text.continue_other_task')}
                        </small>
                      ) : (
                        <small>{t(`dcag.tasks.${category}.taskDesc`)}</small>
                      )}
                    </p>
                  </div>

                  <TaskList
                    setIsError={setIsError}
                    goToPerformTask={goToPerformTask}
                    goToPerformResumeWork={goToPerformResumeWork}
                    myTasks={myTasks}
                    showPayout={showPayout}
                    setAvailableCount={setAvailableCountByCategory}
                    category={category}
                  />
                </React.Fragment>
              );
            })}
          </React.Fragment>
          {taskCategoriesToShow.UPLOAD_IMAGE && !isImageUploadAvailable && (
            <ImageUploadTasksList
              selectedCategory={selectedCategory}
              showPayout={showPayout}
              goToUploadImageTask={goToUploadImageTask}
            />
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default AvailableTasksSegment;
