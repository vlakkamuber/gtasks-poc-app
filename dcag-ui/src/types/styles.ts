import { StyleObject } from 'styletron-react';
import { STYLE_PAGES } from '../hooks/constants';

export type CssType = (a: StyleObject) => string;

export type StylePagesType = (typeof STYLE_PAGES)[keyof typeof STYLE_PAGES];
