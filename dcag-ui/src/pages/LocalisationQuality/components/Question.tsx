import React, { useRef } from 'react';
import { Card } from 'baseui/card';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { useStyletron } from 'baseui';
import { RadioGroup, Radio, ALIGN } from 'baseui/radio';
import { LabelMedium } from 'baseui/typography';
import { DatePicker } from 'baseui/datepicker';

interface QuestionProps {
  question: {
    id: string;
    description: string;
    type: string;
    placeholder?: string;
    required: boolean;
    options: [{ label: string; value: string }];
  };
}

export default function Question({ question, value, onChange }: QuestionProps): JSX.Element {
  const { id, description, placeholder = '', type, required, options } = question;
  const [css, theme] = useStyletron();
  const cardRef = useRef();

  return (
    <Card overrides={{ Root: { style: { marginTop: theme.sizing.scale400 } } }}>
      <div ref={cardRef.current}>
        <FormControl
          label={description}
          labelEndEnhancer={
            required ? <span style={{ color: theme.colors.contentNegative }}>&nbsp;*</span> : null
          }
          overrides={{ Label: { component: LabelMedium } }}>
          {type === 'RADIO' ? (
            <RadioGroup
              value={value}
              required={required}
              onChange={(e) => onChange(id, e.currentTarget.value)}
              name={id}
              align={ALIGN.horizontal}>
              {options.map((option) => (
                <Radio key={option.value} value={option.value}>
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
          ) : type === 'TEXT' ? (
            <Input
              required={required}
              placeholder={placeholder}
              onChange={(e) => {
                onChange(id, e.target.value);
              }}
              value={value}
            />
          ) : type === 'DATE' ? (
            <DatePicker required={required} mountNode={cardRef.current} value={value} onChange={({ date }) => onChange(id, date)} />
          ) : null}
        </FormControl>
      </div>
    </Card>
  );
}
