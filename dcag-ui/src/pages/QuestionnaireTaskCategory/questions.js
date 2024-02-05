function generateQuestionId(description) {
    const cleanedDescription = description.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, '_');

    return cleanedDescription;
  }

  export const questionnaireData = {
    RECEIPT_DIGITIZATION: [
      {
        questionId: "IS_THE_RECIEPT_AVAILABLE",
        id: 3,
        description: 'Is the receipt readable or not readable?',
        type: 'RADIO',
        required: true,
        options: [
          { value: 'yes', label: 'Readable' },
          { value: 'no', label: 'Non-readable' },
        ],
      },
      {
        id: 1,
        questionId:"RECEIPT_ID",
        description: 'Receipt ID',
        type: 'TEXT',
        placeholder: 'Ex. knvlksdnvsdlknvs',
        required: true,
        options: '',
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
              description: 'The language on this screen is clear and easily understood.',
              type: 'RADIO',
              required: true,
              options: [
                { value: 'stronglyAgree', label: 'Strongly Agree' },
                { value: 'agree', label: 'Agree' },
                { value: 'disagree', label: 'Disagree' },
                { value: 'stronglyDisagree', label: 'Strongly Disagree' },
              ],
            },
        {
          id: 2,
          description: 'The language on this screen is as simple and respectful as we expect from Uber.',
          type: 'RADIO',
          required: true,
          options: [
            { value: 'stronglyAgree', label: 'Strongly Agree' },
                { value: 'agree', label: 'Agree' },
                { value: 'disagree', label: 'Disagree' },
                { value: 'stronglyDisagree', label: 'Strongly Disagree' },
          ],
        },
        {
          id: 3,
          description: `The language on this screen is similar to what I speak - it doesn't sound awkward or mechanical.`,
          type: 'RADIO',
          required: true,
          options: [
            { value: 'stronglyAgree', label: 'Strongly Agree' },
            { value: 'agree', label: 'Agree' },
            { value: 'disagree', label: 'Disagree' },
            { value: 'stronglyDisagree', label: 'Strongly Disagree' },
          ],
        },
        {
          id: 4,
          description: 'The icons and designs on this screen match my culture.',
          type: 'RADIO',
          required: true,
          options: [
            { value: 'stronglyAgree', label: 'Strongly Agree' },
            { value: 'agree', label: 'Agree' },
            { value: 'disagree', label: 'Disagree' },
            { value: 'stronglyDisagree', label: 'Strongly Disagree' },
          ],
        },
        {
          id: 5,
          description: 'Please rank between 1-4',
          type: 'RADIO',
          required: true,
          options: [
            { value: 'stronglyAgree', label: 'Strongly Agree' },
            { value: 'agree', label: 'Agree' },
            { value: 'disagree', label: 'Disagree' },
            { value: 'stronglyDisagree', label: 'Strongly Disagree' },
          ],
        },
        ],
        IMAGE_LABELLING: [
          {
            id: 1,
            description: 'Is the food item clearly visible in the photo?',
            type: 'RADIO',
            required: true,
            options: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
          {
            id: 2,
            description: 'Does the photo have alcohol or tobacco?',
            type: 'RADIO',
            required: true,
            options: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
          {
            id: 3,
            description: 'Does the photo have a watermark?',
            type: 'RADIO',
            required: true,
            options: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
          {
            id: 4,
            description: 'Is there more than 1 dish in the photo?',
            type: 'RADIO',
            required: true,
            options: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
          {
            id: 5,
            description: 'Are there any humans in the photo?',
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

  Object.keys(questionnaireData).forEach(category => {
    questionnaireData[category].forEach(question => {
      question.questionId = generateQuestionId(question.description);
    });
  });
