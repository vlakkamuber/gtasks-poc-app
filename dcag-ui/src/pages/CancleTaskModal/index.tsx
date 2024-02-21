import { Modal, ModalBody, ModalButton, ModalFooter, ModalHeader } from 'baseui/modal';
import React from 'react';
import CancleTaskIcon from './CancleTaskIcon';
import { HeadingMedium, ParagraphMedium } from 'baseui/typography';
import { useTranslation } from 'react-i18next';

const CancleTaskModal = ({
  closeCancelModal,
  stopWork,
  price,
  isCancleModalOpen,
  setIsCancleModalOpen
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Modal
        isOpen={isCancleModalOpen}
        onClose={() => setIsCancleModalOpen(false)}
        animate
        autoFocus
        closeable
        overrides={{
          Root: {
            style: () => ({
              textAlign: 'center'
            })
          },
          Dialog: {
            style: () => ({
              paddingTop: '32px'
            })
          },
          Close: {
            style: () => ({
              margin: '8px'
            })
          }
        }}>
        <ModalHeader>
          <div className="mb-32">
            <CancleTaskIcon />
          </div>
          <HeadingMedium
            overrides={{
              Block: {
                style: {
                  marginBottom: '32px'
                }
              }
            }}>
            {t('dcag.tasks.cancle_task_modal.heading')}
          </HeadingMedium>
        </ModalHeader>
        <ModalBody>
          <ParagraphMedium
            overrides={{
              Block: {
                style: {
                  marginBottom: '32px'
                }
              }
            }}>
            {t('dcag.tasks.cancle_task_modal.message')} ₹{price}{' '}
            {t('dcag.tasks.cancle_task_modal.message.for_task')}
          </ParagraphMedium>
        </ModalBody>
        <ModalFooter>
          <ModalButton
            onClick={closeCancelModal}
            overrides={{
              BaseButton: {
                style: () => ({
                  width: '100%',
                  marginBottom: '16px'
                })
              }
            }}>
            {t('dcag.tasks.cancle_task_modal.confirm_no')}
          </ModalButton>
          <ModalButton
            kind="secondary"
            onClick={stopWork}
            overrides={{
              BaseButton: {
                style: () => ({
                  width: '100%'
                })
              }
            }}>
            {t('dcag.tasks.cancle_task_modal.confirm_yes')}
          </ModalButton>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CancleTaskModal;
