import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';
import React, { ReactElement } from 'react';

type Props = {
  children: ReactElement | ReactElement[];
  alignItems?: string;
  alignContent?: string;
  flexDirection?: string;
  flexFlow?: string;
  flexWrap?: string;
  justifyContent?: string;
};

const FlexBox: React.FC<Props> = (props) => {
  const [css] = useStyletron();
  const { children, ...flexPropertities } = props;
  return (
    <Block
      // @ts-expect-error - maps css values
      className={css({
        display: 'flex',
        ...flexPropertities
      })}>
      {props.children}
    </Block>
  );
};

export default FlexBox;
