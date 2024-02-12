function generateQuestionId(description) {
  const cleanedDescription = description
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, '_');

  return cleanedDescription;
}
export const questionnaireData = [{
    id: 1,
    description: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q1',
    label:"Are you enjoying using the app?",
    type: 'RADIO',
    required: true,
    options: [
      { value: 'Yes', label: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q1.answer.yes' },
      { value: 'No', label: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q1.answer.no' }
    ]
  },
  {
    id: 2,
    description: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q2',
    label:"What is your favourite task?",
    type: 'RADIO',
    required: true,
    options: [
      { value: 'RECORD_AUDIO', label: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q2.answer.RECORD_AUDIO' },
      { value: 'RECEIPT_DIGITIZATION', label: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q2.answer.RECEIPT_DIGITIZATION' },
      { value: 'LANGUGAE_QUALITY', label: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q2.answer.LANGUGAE_QUALITY' },
      { value: 'IMAGE_LABELLING', label: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q2.answer.IMAGE_LABELLING' },
      { value: 'MENU_REVIEW', label: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q2.answer.MENU_REVIEW' }
    ]
  },
  {
    id: 3,
    description: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q3',
    label:"Why is it your favourite task?",
    type: 'RADIO',
    required: true,
    options: [
      { value: 'EASY_TO_DO', label: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q3.answer.ESAY_TO_DO'},
      { value: 'MORE_MONEY', label: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q3.answer.MORE_MONEY'},
      { value: 'NO_OR_LESS_QUESTIONS', label: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q3.answer.NO_OR_LESS_QUESTIONS'},
      { value: 'LESS_TIME', label: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q3.answer.LESS_TIME'}
    ]
  },
  {
    id: 4,
    description: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q4',
    label:"Which task do you not like?",
    type: 'RADIO',
    required: true,
    options: [
      { value: 'RECORD_AUDIO', label: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q4.answer.RECORD_AUDIO' },
      { value: 'RECEIPT_DIGITIZATION', label: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q4.answer.RECEIPT_DIGITIZATION' },
      { value: 'LANGUGAE_QUALITY', label: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q4.answer.LANGUGAE_QUALITY' },
      { value: 'IMAGE_LABELLING', label: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q4.answer.IMAGE_LABELLING' },
      { value: 'MENU_REVIEW', label: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q4.answer.MENU_REVIEW' }
    ]
  },
  {
    id: 5,
    description: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q5',
    label:"Why do you not like the task?",
    type: 'RADIO',
    required: true,
    options: [
        { value: 'DIFFICULT_TO_DO', label: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q5.answer.DIFFICULT_TO_DO' },
        { value: 'NOT_UNDERSTAND_THE_TASK', label: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q5.answer.NOT_UNDERSTAND_THE_TASK' },
        { value: 'LESS_MONEY', label: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q5.answer.LESS_MONEY' },
        { value: 'MORE_TIME', label: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q5.answer.MORE_TIME'},
        { value: 'MANY_QUESTION', label: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q5.answer.MANY_QUESTION'}
      ]
  },
  {
    id: 6,
    description: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q6',
    label:"When do you work on the app?",
    type: 'RADIO',
    required: true,
    options: [
        { value: 'BETWEEN_TRIPS', label: 'During waiting time between trips' },
        { value: 'AT_HOME', label: 'At home' },
        { value: 'TRAFFIC_JAM', label: 'Traffic jam' },
        { value: 'LUNCH_BREAK', label: 'Lunch break' },
      ]
  },
  {
    id: 7,
    description: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q7',
    label:"Please specify the reason",
    type: 'RADIO',
    required: true,
    options: [
        { value: 'NOT_A_RECEIPT_IAMGE', label: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q7.answer.NOT_A_RECEIPT_IAMGE' },
        { value: 'IMAGE_NOT_CLEAR', label: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q7.answer.IMAGE_NOT_CLEAR' },
        { value: 'IMAGE_IS_CUT', label: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q7.answer.IMAGE_IS_CUT' },
        { value: 'FADED_CURSHED', label: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q7.answer.FADED_CURSHED' },
        { value: 'POOR_LIGHTING', label: 'dcag.tasks.SURVEY_QUESTIONNAIRE.q7.answer.POOR_LIGHTING' },
      ]
  }
]


questionnaireData.forEach((question) => {
    question.questionId = generateQuestionId(question.label);
  });