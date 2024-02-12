import React,{useState} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton, SIZE, ROLE } from 'baseui/modal';
import { KIND as ButtonKind } from "baseui/button";
import {ParagraphSmall} from 'baseui/typography';
import {Heading, HeadingLevel} from 'baseui/heading';
import { Block } from 'baseui/block';
import Question from './components/Questions';
import {questionnaireData} from "./questions";
import { useUserAuth } from '../../context/UserAuthContext';
import apiService from '../apiService';
import { useHistory } from 'react-router-dom';
import { ButtonDock } from 'baseui/button-dock';
import { Button, KIND, SHAPE } from 'baseui/button';
import { useTranslation } from 'react-i18next';

const SurveyModal = ({ isOpen, onClose }) => {
  const { user } = useUserAuth();
  const { t } = useTranslation();
  const history = useHistory();
  const [questions,setQuestions] = useState(questionnaireData)
  const [formState,setFormState] = useState({})
  const [showToast, setShowToast] = useState(false);

  const assignSurveyToCompleted = (formDataForSubmission) => {
    let userId = JSON.parse(localStorage.getItem('loggedInUser'));
    apiService
      .assignSurveyToCompleted({
        userId,
        body: { survey: formDataForSubmission, status: 'COMPLETED' },
        user
      })
      .then((result) => {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          onClose()
          history.push('/dashboard/tasks');
        }, 1000);
      })
      .catch((error) => {
        console.error('Error fetching task data:', error);
      });
  };
  const assignSurveyToSkipped = () => {
    let userId = JSON.parse(localStorage.getItem('loggedInUser'));
    apiService
      .assignSurveyToSkipped({
        userId,
        body: { status: 'SKIPPED' },
        user
      })
      .then((result) => {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          onClose()
        }, 1000);
      })
      .catch((error) => {
        console.error('Error fetching task data:', error);
      });
  };

  const onSaveSurvey = (e) => {
    e.preventDefault();
    console.log(formState);
    const formDataForSubmission = Object.keys(formState).map((questionId) => ({
      question:questionId,
      answer: formState[questionId]
    }));
    console.log(formDataForSubmission)
    assignSurveyToCompleted(formDataForSubmission)
  };

  const onSkip = (e) =>{
    e.preventDefault();
    assignSurveyToSkipped()
  }
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
          <Block>
                {questions.map((item) => (
                  <Question
                    key={item.id}
                    question={item}
                    value={formState[item.questionId]}
                    onChange={(questionId, value) => {
                      setFormState((state) => ({ ...state, [questionId]: value }));
                    }}
                  />
                ))}
                
          </Block>
      </ModalBody>
      <ModalFooter>
      <ButtonDock
                  overrides={{
                    Root: {
                      style: () => ({
                        paddingLeft: '0px',
                        paddingRight: '0px'
                      })
                    }
                  }}
                  primaryAction={
                    <Button onClick={(e) => onSaveSurvey(e)}>
                      {t(`dcag.home.btn.submit.label`)}
                    </Button>
                  }
                  dismissiveAction={
                    <>
                      <Button
                        kind={KIND.tertiary}
                        id="cancel-task"
                        onClick={onSkip}
                        colors={{ color: '#E11900', backgroundColor: 'transparent' }}>
                        {t(`dcag.home.btn.cancel.label`)}
                      </Button>
                    </>
                  }
                />
      </ModalFooter>
    </Modal>
  );
};

export default SurveyModal;
