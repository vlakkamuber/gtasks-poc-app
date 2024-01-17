import React from 'react';
import { IonLoading } from '@ionic/react';

const LoadingComponent  = ({ showLoading, onHide }) => {
  return (
    <IonLoading
      isOpen={showLoading}
      onDidDismiss={onHide}
      message={'Please wait...'}
    />
  );
};

export default LoadingComponent;
