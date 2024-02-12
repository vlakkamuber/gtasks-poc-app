import React, { useRef } from 'react';
import { Card } from 'baseui/card';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { useStyletron } from 'baseui';
import { RadioGroup, Radio, ALIGN } from 'baseui/radio';
import { LabelMedium } from 'baseui/typography';
import { DatePicker } from 'baseui/datepicker';
import { useTranslation } from 'react-i18next';

interface QuestionProps {
  question: {
    id: string;
    description: string;
    questionId: string;
    type: string;
    placeholder?: string;
    required: boolean;
    options: [{ label: string; value: string }];
  };
  value: string; // Ensure the correct type for value
  onChange: (questionId: string, value: string) => void; // Ensure the correct
  isCompleted: boolean;
  logEvent?: (action: string) => void;
}

export default function Question({
  question,
  value,
  isCompleted,
  onChange,
  logEvent
}: QuestionProps): JSX.Element {
  const { id, description, placeholder = '', type, required, options, questionId } = question;
  const [css, theme] = useStyletron();
  const { t } = useTranslation();
  const cardRef = useRef();
  const isDisabled = isCompleted;
  const handleRadioClick = (e) => {
    const option = options.find((item) => item.value === e.currentTarget.value);
    logEvent('click_radio_button', { questionId, value: option?.label });
    onChange(questionId, e.currentTarget.value);
  };
  return (
    <Card overrides={{ Root: { style: { marginTop: theme.sizing.scale400 } } }}>
      <div ref={cardRef.current}>
        <FormControl
          label={t(description)}
          labelEndEnhancer={
            required ? <span style={{ color: theme.colors.contentNegative }}>&nbsp;*</span> : null
          }
          overrides={{ Label: { component: LabelMedium } }}>
          {type === 'RADIO' ? (
            <RadioGroup
              value={value}
              disabled={isDisabled}
              required={required}
              onChange={handleRadioClick}
              name={questionId}>
              {options.map((option) => (
                <Radio key={option.value} value={option.value} disabled={isDisabled}>
                  {t(option.label)}
                </Radio>
              ))}
            </RadioGroup>
          ) : type === 'TEXT' ? (
            <Input
              required={required}
              placeholder={placeholder}
              onChange={(e) => {
                onChange(questionId, e.target.value);
              }}
              disabled={isDisabled}
              value={value}
            />
          ) : type === 'DATE' ? (
            <DatePicker
              required={required}
              mountNode={cardRef.current}
              value={value ? new Date(value) : new Date()}
              onChange={({ date }) => onChange(questionId, date)}
              disabled={isDisabled}
            />
          ) : null}
        </FormControl>
      </div>
    </Card>
  );
}
