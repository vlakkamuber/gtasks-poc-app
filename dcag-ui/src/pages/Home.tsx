import {
  IonContent,
  IonPage,
} from '@ionic/react';

import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCategory } from '../context/TaskCategoryContext';
import { ArrowRight, ArrowLeft } from 'baseui/icon';

import { Button, KIND, SHAPE, SIZE } from 'baseui/button';
import { Card, StyledBody,StyledThumbnail } from 'baseui/card';
import { Block } from 'baseui/block';
import { DisplayXSmall, ParagraphMedium, LabelSmall, LabelMedium } from 'baseui/typography';

import useAnalytics from '../hooks/useAnanlytics';

const taskCategories = [
  {
    id: 'RECORD_AUDIO',
    imageSrc: 'assets/record_audio.png',
    title: 'Record Audio',
    subtitle: 'Read text, validate pronunciation and record correct audio',
    show: true,
    rate: 0.8,
    duration: '30 seconds',
  },
  {
    id: 'DESCRIBE_IMAGE',
    imageSrc: 'assets/audio_to_audio.png',
    title: 'Describe Image',
    subtitle: 'View the location image and provide description about the image.',
    show: false,
    rate: 2, 
    duration: '15 minutes',
  },
  {
    id: 'UPLOAD_IMAGE',
    imageSrc: 'assets/text_to_audio.png',
    title: 'Upload Image',
    subtitle: 'upload a location image and provide description about the image.',
    show: false,
    rate: 2, 
    duration: '15 minutes',
  },
  {
    id: 'RECEIPT_DIGITIZATION',
    imageSrc: 'assets/receipt_digitization.png',
    title: 'Receipt Digitization',
    subtitle: 'View the receipt image and provide answer about the image.',
    show: true,
    rate: 1.3,
    duration: '45 seconds',
  },
  {
    id: 'LOCALIZATION_QUALITY',
    imageSrc: 'assets/language_quality.png',
    title: 'Localization Quality',
    subtitle: 'View the receipt image and provide answer about the image.',
    show: true,
    rate: 1.7,
    duration: '1 minute',
  },
  {
    id: 'IMAGE_LABELLING',
    imageSrc: 'assets/audio_to_audio.png',
    title: 'Image Labelling',
    subtitle: 'View the image  and provide answer about the image.',
    show: true,
    rate: 0.6,
    duration: '20 seconds',
  },
  {
    id: 'MENU_PHOTO_REVIEW',
    imageSrc: 'assets/text_to_image.png',
    title: 'Menu Photo Review',
    subtitle: 'View the image  and provide answer about the image.',
    show: true,
    rate: 0.6,
    duration: '20 seconds',
  }
];
const Home: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const logEvent = useAnalytics({ page: 'Home' });

  const { selectedCategory, setSelectedCategory } = useCategory();

  const handleTaskCategory = (category) => {
    logEvent({ actions: 'View tasks', properties: category });
    // Set the selected category in localStorage
    localStorage.setItem('selectedCategory', category);
    setSelectedCategory(category);
    history.push('/dashboard/tasks');
  };

  const goBack = () => {
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
              title={t(`dcag.home.taskHub.${category.id}.title`)}
            >
            <StyledThumbnail
              src={category.imageSrc}
            />
            <StyledBody>{t(`dcag.home.taskHub.${category.id}.subtitle`)}</StyledBody>
            <div>
                <p style={{marginBottom: '0px'}}>Rate: ₹{category.rate}</p>
                <p style={{marginTop: '0px'}}>Duration: {category.duration}</p>
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
