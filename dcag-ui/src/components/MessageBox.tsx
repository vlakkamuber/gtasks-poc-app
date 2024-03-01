import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';
import React from 'react';

type kindType = 'positive' | 'negative';

type Props = {
  kind?: kindType;
  children: React.ReactElement;
};

export const MESSAGE_BOX_KIND: { [data: string]: kindType } = {
  POSITIVE: 'positive',
  NEGATIVE: 'negative'
};

const MessageBox: React.FC<Props> = ({ kind = MESSAGE_BOX_KIND.POSITIVE, children }) => {
  const [css, $theme] = useStyletron();
  const KIND_TO_BG_COLOR_MAPPER = {
    [MESSAGE_BOX_KIND.POSITIVE]: '#EAF6ED',
    [MESSAGE_BOX_KIND.NEGATIVE]: '#FFEFED'
  };
  return (
    <Block
      className={css({
        backgroundColor: KIND_TO_BG_COLOR_MAPPER[kind],
        padding: $theme.sizing.scale600,
        border: '1px solid #E2E2E2',
        borderRadius: '12px'
      })}>
      {children}
    </Block>
  );
};

export default MessageBox;
