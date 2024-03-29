import React from 'react';
import { Modal, ModalHeader, ModalBody, SIZE, ROLE } from 'baseui/modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { HeadingXSmall } from 'baseui/typography';
import { useTranslation } from 'react-i18next';

const InstructionsModal: React.FC<{
  isOpen: boolean;
  taskType?: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen, taskType }) => {
  const { t } = useTranslation();
  return (
    <Modal
      onClose={() => setIsOpen(false)}
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.alertdialog}
      overrides={{
        Root: {
          style: () => ({
            borderRadius: 0
          })
        },
        Close: { component: null },
        Dialog: {
          style: {
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px',
            padding: '20px'
          }
        }
      }}>
      <ModalHeader style={{ display: 'flex', justifyContent: 'center' }}>
        <HeadingXSmall>
          {`${t(`dcag.home.taskHub.${taskType}.title`)} - ${t('dcag.tasks.INSTRUCTIONS_BUTTON.title')}`}
        </HeadingXSmall>
      </ModalHeader>
      <ModalBody>
        <Swiper
          modules={[Navigation]}
          navigation={true}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}>
          <SwiperSlide style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={'assets/1.jpeg'} style={{ height: '50vh' }} />
          </SwiperSlide>
          <SwiperSlide style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={'assets/2.jpeg'} style={{ height: '50vh' }} />
          </SwiperSlide>
          <SwiperSlide style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={'assets/3.jpeg'} style={{ height: '50vh' }} />
          </SwiperSlide>
        </Swiper>
      </ModalBody>
    </Modal>
  );
};

export default InstructionsModal;
