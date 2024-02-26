import React from 'react';
import NoTasksAvailable from './NoTasksAvailable';
import AlertInfoCard from '../../../components/AlertInfoCard';
import TaskSwitcher from '../TaskSwitcher';
import TaskListRow from './TaskListRow';
import TasksSkeleton from '../TasksSkeleton';
import LoadMoreButton from './LoadMoreButton';
import ImageUploadTasksList from './ImageUploadTasksList';
import { useTranslation } from 'react-i18next';
import type { Task } from '../../../types/tasks-types';
import { TASK_CATEGORIES_DATA } from '../../../constants/constant';

const AvailableTasksSegment: React.FC<{
  tasks: Record<string, Task[]>;
  availableCount: number;
  location: string;
  showLoading: boolean;
  completedCount: number;
  selectedCategory: string;
  todayEarnings: number;
  showPayout: boolean;
  goToPerformTask: () => void;
  goToPerformResumeWork: () => void;
  loadMore: () => void;
  goToUploadImageTask: () => void;
  taskCategoriesToShow: Record<string, boolean>;
  isImageUploadAvailable: boolean;
}> = ({
  tasks,
  availableCount,
  location,
  showLoading,
  completedCount,
  selectedCategory,
  todayEarnings,
  showPayout,
  goToPerformTask,
  goToPerformResumeWork,
  loadMore,
  goToUploadImageTask,
  taskCategoriesToShow,
  isImageUploadAvailable
}) => {
  const { t } = useTranslation();

  const selectedCategoryTitle = TASK_CATEGORIES_DATA.find(
    (item) => item.id === selectedCategory
  )?.title;

  const selectedTaskType = TASK_CATEGORIES_DATA.find((item) => item.id === selectedCategory);

  return (
    <React.Fragment>
      {!availableCount && !showLoading && (
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
            {Object.keys(tasks).map((key, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="ion-padding">
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                      <h1 style={{ margin: '0', marginBottom: '-4px' }}>
                        {(location === 'HYDERABAD' || location === 'CHENNAI') &&
                        (key === 'IMAGE_LABELLING' || key === 'MENU_PHOTO_REVIEW')
                          ? t(`dcag.tasks.${key}.CHENNAI_HYD.title`)
                          : t(`dcag.tasks.${key}.title`)}
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
                      {availableCount === 0 ? (
                        <small>
                          {completedCount > 0
                            ? t('dcag.tasks.text.all_task_completed')
                            : t('dcag.tasks.text.no_more_task')}{' '}
                          {selectedTaskType?.title}. {t('dcag.tasks.text.continue_other_task')}
                        </small>
                      ) : (
                        <small>{t(`dcag.tasks.${key}.taskDesc`)}</small>
                      )}
                    </p>
                  </div>

                  {showLoading ? (
                    <TasksSkeleton />
                  ) : (
                    tasks[key].map((task: Task, index: number) => {
                      return (
                        <TaskListRow
                          key={index}
                          task={task}
                          showPayout={showPayout}
                          taskKey={key}
                          goToPerformTask={goToPerformTask}
                          goToPerformResumeWork={goToPerformResumeWork}
                        />
                      );
                    })
                  )}
                  <LoadMoreButton loadMore={loadMore} taskKey={key} />
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
