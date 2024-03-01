import React, { useState, useEffect } from 'react';
import { IonSegment, IonSegmentButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import CompletedTasks from './CompletedTasks';
const MyTasks: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState('completed');
  const handleSegmentChange = (e: CustomEvent) => {
    setSelectedSegment(e.detail.value);
  };

  const history = useHistory();

  const goBack = () => {
    history.goBack(); // This function navigates back to the previous page
  };
  return (
    <React.Fragment>
      <CompletedTasks />
    </React.Fragment>
  );
};

export default MyTasks;
