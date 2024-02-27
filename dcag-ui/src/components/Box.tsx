import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';
import React, { ReactElement } from 'react';

type Props = {
  children: ReactElement | ReactElement[];
  p?: string;
  px?: string;
  py?: string;
  pt?: string;
  pb?: string;
  pl?: string;
  pr?: string;
  m?: string;
  mx?: string;
  my?: string;
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;
};

const Box: React.FC<Props> = (props) => {
  const [css] = useStyletron();
  const spacingProperties = {
    ...(props.p ? { padding: props.p } : {}),
    ...(props.px ? { paddingLeft: props.px, paddingRight: props.px } : {}),
    ...(props.py ? { paddingTop: props.py, paddingBottom: props.py } : {}),
    ...(props.pt ? { paddingTop: props.pt } : {}),
    ...(props.pb ? { paddingBottom: props.pb } : {}),
    ...(props.pl ? { paddingLeft: props.pl } : {}),
    ...(props.pr ? { paddingRight: props.pr } : {}),
    ...(props.m ? { margin: props.m } : {}),
    ...(props.mx ? { marginLeft: props.mx, marginRight: props.mx } : {}),
    ...(props.my ? { marginTop: props.my, marginBottom: props.my } : {}),
    ...(props.mt ? { marginTop: props.mt } : {}),
    ...(props.mb ? { marginBottom: props.mb } : {}),
    ...(props.ml ? { marginLeft: props.ml } : {}),
    ...(props.mr ? { marginRight: props.mr } : {})
  };
  return <Block className={css({ ...spacingProperties })}>{props.children}</Block>;
};

export default Box;
