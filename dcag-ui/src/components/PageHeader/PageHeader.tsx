import { Block } from 'baseui/block';
import { Button, KIND } from 'baseui/button';
import { ArrowLeft } from 'baseui/icon';
import { HeadingLarge } from 'baseui/typography';
import React from 'react';
import LanguageSwitcher from '../LanguageSwitcher';
import useAnalytics from '../../hooks/useAnanlytics';
import { useHistory } from 'react-router';
import FlexBox from '../FlexBox';
import Box from '../Box';
import useStyles from '../../hooks/useStyles';
import { STYLE_PAGES } from '../../hooks/constants';
import { useStyletron } from 'baseui';
import { BASE_BUTTON_OVERRIDES, LANGUAGE_SWITCH_BUTTON_OVERRIDES } from './styles';

type Props = {
  title: string;
  page: string;
  showBackButton?: boolean;
  showLanguageSwitcher?: boolean;
  isHeaderFixed?: boolean;
};

const PageHeader: React.FC<Props> = ({
  title,
  page,
  showBackButton = true,
  showLanguageSwitcher = true,
  isHeaderFixed = true
}) => {
  const logEvent = useAnalytics({ page });
  const history = useHistory();
  const [_, $theme] = useStyletron();
  const { headerContainerFixedStyle, fixedHeaderBuffer } = useStyles(STYLE_PAGES.PAGE_HEADER);
  const goBack = () => {
    logEvent({ actions: 'click_go_back' });
    history.goBack();
  };

  return (
    <>
      <Block className={isHeaderFixed && headerContainerFixedStyle}>
        <Box px={$theme.sizing.scale600}>
          <FlexBox justifyContent="space-between" alignItems="center">
            <HeadingLarge>
              <FlexBox alignItems="center">
                {showBackButton ? (
                  <Button kind={KIND.tertiary} onClick={goBack} overrides={BASE_BUTTON_OVERRIDES}>
                    <ArrowLeft size={32} />
                  </Button>
                ) : (
                  <></>
                )}
                <>{title}</>
              </FlexBox>
            </HeadingLarge>
            <Button kind={KIND.tertiary} overrides={LANGUAGE_SWITCH_BUTTON_OVERRIDES}>
              {showLanguageSwitcher && <LanguageSwitcher page={page} />}
            </Button>
          </FlexBox>
        </Box>
      </Block>
      {isHeaderFixed && <Block className={fixedHeaderBuffer}></Block>}
    </>
  );
};

export default PageHeader;
