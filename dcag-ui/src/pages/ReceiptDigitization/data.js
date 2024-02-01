export default {
  id: 303,
  userId: '3kllbPzzBHSZW3uKp8Jk9xXJNVY2',
  taskId: 1762,
  taskName: 'Banjara Hill Road No.3',
  taskType: 'RECEIPT_DIGITIZATION',
  input: 'banjara_hills_road3.jpeg',
  output: null,
  outputDesc: null,
  status: 'IN_PROGRESS',
  currency: 'USD',
  price: 1.0,
  startTime: 1706718470000,
  completedTime: null,
  inputUrl: 'https://docs-demo.ionic.io/assets/madison.jpg',
  outputUrl: null,
  uploadUrl: '',
  createDateTime: 1706659200000,
  dueDateTime: 1706659200000,
  useInput: false,
  questionnaire: [
    {
      id: 1,
      description: 'Is the receipt readable or not readable ?',
      type: 'RADIO',
      required: true,
      options: [{ value: 'yes', label: 'Readable',},{value: 'no', label: 'Non readable'}]
    },
    {
      id: 2,
      description: 'Receipt date',
      type: 'DATE',
      required: true,
      options: ''
    },
    {
      id: 3,
      description: 'Receipt ID',
      type: 'TEXT',
      placeholder: 'Ex. knvlksdnvsdlknvs',
      required: true,
      options: ''
    },
    {
      id: 4,
      description: 'Total Amount',
      type: 'TEXT',
      required: true,
      options: ''
    }
  ]
};
