import { useStyletron } from 'baseui';
import { getHomePageStyle } from '../pages/Home/styles';
import { STYLE_PAGES } from './constants';
import { StylePagesType } from '../types/styles';

const useStyles = (page: StylePagesType) => {
  const [css, $theme] = useStyletron();
  const homePageStyle = getHomePageStyle(css, $theme);
  const styles = {
    [STYLE_PAGES.HOME]: homePageStyle
  };
  return styles[page];
};

export default useStyles;
