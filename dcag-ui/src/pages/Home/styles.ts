import { type Theme } from 'baseui';
import { type CssType } from '../../types/styles';

export const getHomePageStyle = (css: CssType, $theme: Theme) => ({
  categoryTitleStyle: css({
    textAlign: 'center',
    margin: '0px',
    paddingTop: $theme.sizing.scale600,
    paddingBottom: $theme.sizing.scale100
  }),
  taskCardStyles: css({
    backgroundColor: $theme.colors.backgroundTertiary,
    borderRadius: $theme.sizing.scale500,
    padding: $theme.sizing.scale600,
    cursor: 'pointer'
  }),
  thumbnailImageStyle: css({
    borderRadius: $theme.sizing.scale300
  }),
  rateStyle: css({
    margin: '0px'
  }),
  tagFilledIcon: css({
    marginRight: $theme.sizing.scale100
  }),
  taskHubSubTitleStyle: css({
    marginTop: 0,
    marginBottom: $theme.sizing.scale600
  }),
  chooseTaskTypeLabel: css({
    margin: 0
  })
});
