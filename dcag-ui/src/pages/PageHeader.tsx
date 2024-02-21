import { Block } from 'baseui/block';
import { Button, KIND } from 'baseui/button';
import { ArrowLeft } from 'baseui/icon';
import { LabelMedium } from 'baseui/typography';
import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import useAnalytics from '../hooks/useAnanlytics';
import { useHistory } from 'react-router';

const PageHeader = ({ title, page, showBackButton = true, showLanguageSwitcher = true }) => {
  const logEvent = useAnalytics({ page });
  const history = useHistory();
  const goBack = () => {
    logEvent({ actions: 'click_go_back' });
    history.goBack(); // This function navigates back to the previous page
  };

  return (
    <>
      <div className="fixed-header">
        <Block className="p-16 fixed-header-home-content ">
          <Button
            kind={KIND.tertiary}
            onClick={goBack}
            overrides={{
              BaseButton: {
                style: () => ({
                  padding: '0px',
                  visibility: showBackButton ? 'visible' : 'hidden'
                })
              }
            }}>
            <ArrowLeft size={32} />
          </Button>
          <LabelMedium>{title}</LabelMedium>
          <Button
            kind={KIND.tertiary}
            overrides={{
              BaseButton: {
                style: () => ({
                  padding: '0px'
                })
              }
            }}>
            {showLanguageSwitcher ? (
              <LanguageSwitcher page={page} />
            ) : (
              <div style={{ width: '32px' }} />
            )}
          </Button>
        </Block>
      </div>
      <div className="fixed-header-buffer"></div>
    </>
  );
};

export default PageHeader;
