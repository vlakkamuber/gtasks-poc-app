import React, { ReactElement } from 'react';
import Box from './Box';
import { useStyletron } from 'baseui';

type Props = {
  children: ReactElement | ReactElement[];
};

const Page: React.FC<Props> = ({ children }) => {
  const [_, $theme] = useStyletron();
  return <Box p={$theme.sizing.scale600}>{children}</Box>;
};

export default Page;
