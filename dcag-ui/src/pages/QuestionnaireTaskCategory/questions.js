export function generateQuestionId(description) {
  const cleanedDescription = description
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, '_');

  return cleanedDescription;
}

export const questionnaireData = {
  RECEIPT_DIGITIZATION: [
    {
      questionId: 'IS_THE_RECIEPT_AVAILABLE',
      id: 3,
      description: 'dcag.tasks.RECEIPT_DIGITIZATION.q1',
      type: 'RADIO',
      required: true,
      options: [
        { value: 'yes', label: 'dcag.tasks.imageDigitization.questions.option.label.readable' },
        { value: 'no', label: 'dcag.tasks.imageDigitization.questions.option.label.nonreadable' }
      ],
      showIfReadable: true,
      showIfUnreadable: true
    },
    {
      id: 1,
      questionId: 'RECEIPT_ID',
      description: 'dcag.tasks.RECEIPT_DIGITIZATION.q3',
      type: 'TEXT',
      required: true,
      options: '',
      showIfReadable: true,
      showIfUnreadable: false
    },
    {
      id: 2,
      questionId: 'RECEIPT_DATE',
      description: 'dcag.tasks.RECEIPT_DIGITIZATION.q2',
      type: 'TEXT',
      required: true,
      options: '',
      showIfReadable: true,
      showIfUnreadable: false
    },
    {
      id: 4,
      questionId: 'TOTAL_AMOUNT',
      description: 'dcag.tasks.RECEIPT_DIGITIZATION.q4',
      type: 'TEXT',
      required: true,
      options: '',
      showIfReadable: true,
      showIfUnreadable: false
    },
    {
      id: 5,
      questionId: 'PLEASE_SPECIFY_THE_REASON',
      description: 'dcag.tasks.RECEIPT_DIGITIZATION.q5',
      type: 'RADIO',
      required: true,
      options: [
        { value: 'Not a receipt image', label: 'dcag.tasks.RECEIPT_DIGITIZATION.q5.option1' },
        { value: 'Image not clear', label: 'dcag.tasks.RECEIPT_DIGITIZATION.q5.option2' },
        { value: 'Image is cut', label: 'dcag.tasks.RECEIPT_DIGITIZATION.q5.option3' },
        { value: 'Faded/Crushed', label: 'dcag.tasks.RECEIPT_DIGITIZATION.q5.option4' },
        { value: 'Poor lighting', label: 'dcag.tasks.RECEIPT_DIGITIZATION.q5.option5' }
      ],
      showIfReadable: false,
      showIfUnreadable: true
    }
  ],
  LOCALIZATION_QUALITY: [
    {
      id: 1,
      description: 'dcag.tasks.LOCALIZATION_QUALITY.q1',
      type: 'RADIO',
      required: true,
      options: [
        { value: 'stronglyAgree', label: 'dcag.tasks.answer.stronglyAgree' },
        { value: 'agree', label: 'dcag.tasks.answer.agree' },
        { value: 'disagree', label: 'dcag.tasks.answer.disagree' },
        { value: 'stronglyDisagree', label: 'dcag.tasks.answer.stronglyDisagree' }
      ]
    },
    {
      id: 2,
      description: 'dcag.tasks.LOCALIZATION_QUALITY.q2',
      type: 'RADIO',
      required: true,
      options: [
        { value: 'stronglyAgree', label: 'dcag.tasks.answer.stronglyAgree' },
        { value: 'agree', label: 'dcag.tasks.answer.agree' },
        { value: 'disagree', label: 'dcag.tasks.answer.disagree' },
        { value: 'stronglyDisagree', label: 'dcag.tasks.answer.stronglyDisagree' }
      ]
    },
    {
      id: 3,
      description: `dcag.tasks.LOCALIZATION_QUALITY.q3`,
      type: 'RADIO',
      required: true,
      options: [
        { value: 'stronglyAgree', label: 'dcag.tasks.answer.stronglyAgree' },
        { value: 'agree', label: 'dcag.tasks.answer.agree' },
        { value: 'disagree', label: 'dcag.tasks.answer.disagree' },
        { value: 'stronglyDisagree', label: 'dcag.tasks.answer.stronglyDisagree' }
      ]
    },
    {
      id: 4,
      description: 'dcag.tasks.LOCALIZATION_QUALITY.q4',
      type: 'RADIO',
      required: true,
      options: [
        { value: 'stronglyAgree', label: 'dcag.tasks.answer.stronglyAgree' },
        { value: 'agree', label: 'dcag.tasks.answer.agree' },
        { value: 'disagree', label: 'dcag.tasks.answer.disagree' },
        { value: 'stronglyDisagree', label: 'dcag.tasks.answer.stronglyDisagree' }
      ]
    }
  ],
  MENU_PHOTO_REVIEW: [
    {
      id: 1,
      description: 'dcag.tasks.IMAGE_LABELLING.q1',
      type: 'RADIO',
      required: true,
      options: [
        { value: 'yes', label: 'dcag.tasks.answer.yes' },
        { value: 'no', label: 'dcag.tasks.answer.no' }
      ]
    },
    {
      id: 2,
      description: 'dcag.tasks.IMAGE_LABELLING.q2',
      type: 'RADIO',
      required: true,
      options: [
        { value: 'yes', label: 'dcag.tasks.answer.yes' },
        { value: 'no', label: 'dcag.tasks.answer.no' }
      ]
    },
    {
      id: 3,
      description: 'dcag.tasks.IMAGE_LABELLING.q3',
      type: 'RADIO',
      required: true,
      options: [
        { value: 'yes', label: 'dcag.tasks.answer.yes' },
        { value: 'no', label: 'dcag.tasks.answer.no' }
      ]
    },
    {
      id: 4,
      description: 'dcag.tasks.IMAGE_LABELLING.q4',
      type: 'RADIO',
      required: true,
      options: [
        { value: 'yes', label: 'dcag.tasks.answer.yes' },
        { value: 'no', label: 'dcag.tasks.answer.no' }
      ]
    },
    {
      id: 5,
      description: 'dcag.tasks.IMAGE_LABELLING.q5',
      type: 'RADIO',
      required: true,
      options: [
        { value: 'yes', label: 'dcag.tasks.answer.yes' },
        { value: 'no', label: 'dcag.tasks.answer.no' }
      ]
    }
  ],
  IMAGE_LABELLING: [
    {
      id: 1,
      description: 'dcag.tasks.MENU_PHOTO_REVIEW.q1',
      type: 'RADIO',
      required: true,
      options: [
        { value: 'yes', label: 'dcag.tasks.answer.yes' },
        { value: 'no', label: 'dcag.tasks.answer.no' }
      ]
    },
    {
      id: 2,
      description: 'dcag.tasks.MENU_PHOTO_REVIEW.q2',
      type: 'RADIO',
      required: true,
      options: [
        { value: 'yes', label: 'dcag.tasks.answer.yes' },
        { value: 'no', label: 'dcag.tasks.answer.no' }
      ]
    },
    {
      id: 3,
      description: 'dcag.tasks.MENU_PHOTO_REVIEW.q3',
      type: 'RADIO',
      required: true,
      options: [
        { value: 'yes', label: 'dcag.tasks.answer.yes' },
        { value: 'no', label: 'dcag.tasks.answer.no' }
      ]
    },
    {
      id: 4,
      description: 'dcag.tasks.MENU_PHOTO_REVIEW.q4',
      type: 'RADIO',
      required: true,
      options: [
        { value: 'yes', label: 'dcag.tasks.answer.yes' },
        { value: 'no', label: 'dcag.tasks.answer.no' }
      ]
    }
  ]
};

Object.keys(questionnaireData).forEach((category) => {
  questionnaireData[category].forEach((question) => {
    question.questionId = generateQuestionId(question.description);
  });
});
