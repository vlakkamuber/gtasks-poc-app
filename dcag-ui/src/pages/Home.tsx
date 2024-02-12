import { IonContent, IonPage } from '@ionic/react';

import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCategory } from '../context/TaskCategoryContext';
import { ArrowRight, ArrowLeft } from 'baseui/icon';

import { Button, KIND, SHAPE, SIZE } from 'baseui/button';
import { Card, StyledBody, StyledThumbnail } from 'baseui/card';
import { Block } from 'baseui/block';
import { DisplayXSmall, ParagraphMedium, LabelSmall, LabelMedium } from 'baseui/typography';

import useAnalytics from '../hooks/useAnanlytics';
import { ANALYTICS_PAGE, TASK_RATE } from '../constants/constant';
import { useEffect, useState } from 'react';
import apiService from './apiService';
import { useUserAuth } from '../context/UserAuthContext';

const taskCategoriesData = [
  {
    id: 'RECORD_AUDIO',
    imageSrc: 'assets/record_audio.png',
    title: 'Record Audio',
    subtitle: 'Read text, validate pronunciation and record correct audio',
    show: true,
    rate: TASK_RATE['RECORD_AUDIO'],
    duration: '30',
    timeUnit: 'dcag.home.card.duration.seconds'
  },
  {
    id: 'DESCRIBE_IMAGE',
    imageSrc: 'assets/audio_to_audio.png',
    title: 'Describe Image',
    subtitle: 'View the location image and provide description about the image.',
    show: false,
    rate: TASK_RATE['DESCRIBE_IMAGE'],
    duration: '15',
    timeUnit: 'dcag.home.card.duration.minutes'
  },
  {
    id: 'UPLOAD_IMAGE',
    imageSrc: 'assets/text_to_audio.png',
    title: 'Upload Image',
    subtitle: 'upload a location image and provide description about the image.',
    show: false,
    rate: TASK_RATE['UPLOAD_IMAGE'],
    duration: '15',
    timeUnit: 'dcag.home.card.duration.minutes'
  },
  {
    id: 'RECEIPT_DIGITIZATION',
    imageSrc: 'assets/receipt_digitization.png',
    title: 'Receipt Digitization',
    subtitle: 'View the receipt image and provide answer about the image.',
    show: true,
    rate: TASK_RATE['RECEIPT_DIGITIZATION'],
    duration: '45',
    timeUnit: 'dcag.home.card.duration.seconds'
  },
  {
    id: 'LOCALIZATION_QUALITY',
    imageSrc: 'assets/language_quality.png',
    title: 'Localization Quality',
    subtitle: 'View the receipt image and provide answer about the image.',
    show: true,
    rate: TASK_RATE['LOCALIZATION_QUALITY'],
    duration: '1',
    timeUnit: 'dcag.home.card.duration.minutes'
  },
  {
    id: 'IMAGE_LABELLING',
    imageSrc: 'assets/Image_labelling.png',
    title: 'Image Labelling',
    subtitle: 'View the image  and provide answer about the image.',
    show: true,
    rate: TASK_RATE['IMAGE_LABELLING'],
    duration: '20',
    timeUnit: 'dcag.home.card.duration.seconds'
  },
  {
    id: 'MENU_PHOTO_REVIEW',
    imageSrc: 'assets/men_review.png',
    title: 'Menu Photo Review',
    subtitle: 'View the image  and provide answer about the image.',
    show: true,
    rate: TASK_RATE['MENU_PHOTO_REVIEW'],
    duration: '20',
    timeUnit: 'dcag.home.card.duration.seconds'
  }
];

const reshuffleTaskCategories = (tasks,order)=>{
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
}
const Home: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { selectedCategory, setSelectedCategory, location,setLocation } = useCategory();
  const { user } = useUserAuth();
  const logEvent = useAnalytics({ page: ANALYTICS_PAGE.home });
  const [taskCategories,setTaskCategories] = useState((location==="DELHI" || location==="PUNE" ? reshuffleTaskCategories(taskCategoriesData,['IMAGE_LABELLING', 'MENU_PHOTO_REVIEW', 'LOCALIZATION_QUALITY', 'RECEIPT_DIGITIZATION', 'RECORD_AUDIO']) : taskCategoriesData))

  
  const getUserByPhoneNumber = async()=>{
    const storedLocation = localStorage.getItem("location");
    if(storedLocation === "null" || !storedLocation){
      let userResponse  = await apiService.verifyPhoneNumber(user.phoneNumber);
      localStorage.setItem("location",userResponse.cityName);
      setLocation(userResponse.cityName)
    }
  }

  useEffect(() => {
    logEvent({ actions: '' });
    getUserByPhoneNumber();
    //Update task categories based on location
    if (location === 'CHENNAI' || location === 'HYDERABAD') {
      const updatedCategories = taskCategories.map(category => {
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
    if(category==="IMAGE_QUESTIONS"){
      category="IMAGE_LABELLING"
    }else if(category==="MENU_QUESTIONS"){
      category="MENU_PHOTO_REVIEW"
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
          <div
            key={category.id}
            onClick={() => handleTaskCategory(category.id)}
            className="clickable-cursor task-category-wrapper">
            <Card
              overrides={{ Root: { style: { marginBottom: '32px' } } }}
              title={t(`dcag.home.taskHub.${category.id}.title`)}>
              <StyledThumbnail src={category.imageSrc} />
              <StyledBody style={{ color: '#6b6b6b' }}>{t(`dcag.home.taskHub.${category.id}.subtitle`)}</StyledBody>
              <div>
                <p style={{ marginBottom: '0px' }}>
                  {t('dcag.home.taskHub.rate')}: ₹
                  {(Math.round(category.rate * 100) / 100).toFixed(2)}/{t('dcag.home.text.task')}
                </p>
                <p style={{ marginTop: '0px' }}>
                  {t('dcag.home.taskHub.duration')}: {category.duration} {t(category.timeUnit)}/
                  {t('dcag.home.text.task')}
                </p>
              </div>
            </Card>
          </div>
        )
    );
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="fixed-header">
          <Block className="p-16 fixed-header-home-content ">
            <Button
              kind={KIND.tertiary}
              onClick={goBack}
              overrides={{
                BaseButton: {
                  style: () => ({
                    padding: '0px'
                  })
                }
              }}>
              <ArrowLeft size={32} />
            </Button>
            <LabelMedium>{t(`dcag.home.bottomTabs.home`)}</LabelMedium>
            <Button
              kind={KIND.tertiary}
              overrides={{
                BaseButton: {
                  style: () => ({
                    padding: '0px'
                  })
                }
              }}>
              {/* <LabelSmall>Help</LabelSmall> */}
            </Button>
          </Block>
        </div>
        <div className="p-16">
          <div className="fixed-header-buffer"></div>
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
          <div className="mt-16 mb-0">{renderTaskCards()}</div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
