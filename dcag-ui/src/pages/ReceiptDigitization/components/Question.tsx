import React, { useState } from 'react';
import { IonDatetime, IonInput, IonItem, IonRadio, IonRadioGroup, IonText } from '@ionic/react';
import { Card } from 'baseui/card';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { useStyletron } from 'baseui';

interface QuestionProps {
  question: {
    description: string;
    type: string;
    placeholder?: string;
    required: boolean;
    options: [{ label: string; value: string }];
  };
}

export default function Question({ question }: QuestionProps): JSX.Element {
  const { description, placeholder = '', type, required, options } = question;
  const [css, theme] = useStyletron();

  const [value, setValue] = useState('');

  return (
    <Card overrides={{ Root: { style: { marginTop: theme.sizing.scale400 } } }}>
      {type === 'RADIO' ? (
        <IonRadioGroup
          //   compareWith={compareWith}
          onIonChange={(ev) => {
            console.log('Current value:', JSON.stringify(ev.detail.value));
          }}>
          {options.map((option) => (
            <IonItem key={option.value}>
              <IonRadio value={option.value}>{option.label}</IonRadio>
            </IonItem>
          ))}
        </IonRadioGroup>
      ) : type === 'TEXT' ? (
        <FormControl label={description}>
          <Input
            placeholder={placeholder}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={value}
          />
        </FormControl>
      ) : type === 'DATE' ? (
        <IonDatetime></IonDatetime>
      ) : null}
    </Card>
  );
}
