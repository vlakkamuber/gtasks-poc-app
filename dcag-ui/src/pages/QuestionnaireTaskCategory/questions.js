function generateQuestionId(description) {
    const cleanedDescription = description.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, '_');
  
    return cleanedDescription;
  }
  
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
  };
  
  Object.keys(questionnaireData).forEach(category => {
    questionnaireData[category].forEach(question => {
      question.questionId = generateQuestionId(question.description);
    });
  });