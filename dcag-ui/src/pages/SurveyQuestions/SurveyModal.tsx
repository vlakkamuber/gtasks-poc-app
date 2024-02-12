import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton, SIZE, ROLE } from 'baseui/modal';
import { KIND as ButtonKind } from "baseui/button";
import {ParagraphSmall} from 'baseui/typography';
import {Heading, HeadingLevel} from 'baseui/heading';

const SurveyModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      onClose={onClose}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>Share Feedback</ModalHeader>
      <ModalBody>
      <HeadingLevel>
      <ParagraphSmall>
         Please provide your experience with this app. your suggestions and feedback help us to enhance the experience for you.
        </ParagraphSmall>
        <Heading styleLevel={6}>Survey questionnaire </Heading>
        </HeadingLevel>
    
      </ModalBody>
      <ModalFooter>
        <ModalButton kind={ButtonKind.tertiary} onClick={onClose}>
          Skip
        </ModalButton>
        <ModalButton onClick={onClose}>Submit</ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default SurveyModal;
