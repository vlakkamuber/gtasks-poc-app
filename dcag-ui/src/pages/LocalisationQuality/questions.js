const generateQuestionId = (question) => {
  return question.replace(/\s+/g, '_').toUpperCase();
};

export const questionnaireData = {
RECEIPT_DIGITIZATION: [
      {
        questionId: "IS_THE_RECIEPT_AVAILABLE",  
        id: 1,
        description: 'Is the receipt readable or not readable?',
        type: 'RADIO',
        required: true,
        options: [
          { value: 'yes', label: 'Readable' },
          { value: 'no', label: 'Non-readable' },
        ],
      },
      {
        id: 2,
        questionId:"RECEIPT_DATE",
        description: 'Receipt date',
        type: 'DATE',
        required: true,
        options: '',
      },
      {
        id: 3,
        questionId:"RECEIPT_ID",
        description: 'Receipt ID',
        type: 'TEXT',
        placeholder: 'Ex. knvlksdnvsdlknvs',
        required: true,
        options: '',
      },
      {
        id: 4,
        questionId:"TOTAL_AMOUNT",
        description: 'Total Amount',
        type: 'TEXT',
        required: true,
        options: '',
      },
    ],
  LOCALIZATION_QUALITY: [
      {
          id: 1,
          description: 'The language on this screen is clear and concise',
          type: 'RADIO',
          required: false,
          options: [
            { value: 'stronglyAgree', label: 'Strongly Agree' },
            { value: 'agree', label: 'Agree' },
            { value: 'disagree', label: 'Disagree' },
            { value: 'stronglyDisagree', label: 'Strongly Disagree' },
          ],
        },
    {
      id: 2,
      description: 'The language on this screen meets the level of formality i expect from uber',
      type: 'RADIO',
      required: true,
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ],
    },
  ],
  IMAGE_LABELLING: [
      {
        id: 1,
        description: 'Is Packaging present?',
        type: 'RADIO',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
      },
      {
        id: 2,
        description: 'Is Packaging damaged?',
        type: 'RADIO',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
      },
      {
        id: 3,
        description: 'Is Food present?',
        type: 'RADIO',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
      },
      {
        id: 4,
        description: 'Is Drink present?',
        type: 'RADIO',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
      },
    ],
    MENU_PHOTO_REVIEW: [
      {
        id: 1,
        description: 'Is Packaging present?',
        type: 'RADIO',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
      },
      {
        id: 2,
        description: 'Is Packaging damaged?',
        type: 'RADIO',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
      },
      {
        id: 3,
        description: 'Is Food present?',
        type: 'RADIO',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
      },
      {
        id: 4,
        description: 'Is Drink present?',
        type: 'RADIO',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
      },
    ],
};