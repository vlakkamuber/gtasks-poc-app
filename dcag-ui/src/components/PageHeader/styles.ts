import { Theme } from 'baseui';
import { CssType } from '../../types/styles';

export const getPageHeaderStyles = (css: CssType, $theme: Theme) => ({
  headerContainerFixedStyle: css({
    position: 'fixed',
    top: '0px',
    left: '0px',
    right: '0px',
    height: $theme.sizing.scale1600,
    backgroundColor: '#fff',
    zIndex: '1000'
  }),
  fixedHeaderBuffer: css({
    height: $theme.sizing.scale1600
  })
});

export const BASE_BUTTON_OVERRIDES = {
  BaseButton: {
    style: ({ $theme }: { $theme: Theme }) => ({
      padding: '0px',
      marginRight: $theme.sizing.scale400
    })
  }
};

export const LANGUAGE_SWITCH_BUTTON_OVERRIDES = {
  BaseButton: {
    style: () => ({
      padding: '0px'
    })
  }
};
