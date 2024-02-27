import React, { useEffect, useState } from 'react';
import MessageBox from '../../components/MessageBox';
import { Block } from 'baseui/block';
import { useStyletron } from 'baseui';
import { LabelLarge } from 'baseui/typography';
import apiService from '../../BE-services/apiService';
import { useUserAuth } from '../../context/UserAuthContext';

type Props = {
  hide?: boolean;
};

const EarningRingMessage: React.FC<Props> = ({ hide = false }) => {
  const [css, $theme] = useStyletron();
  const [totalEarning, setTotalEarning] = useState();
  const { user } = useUserAuth();

  useEffect(() => {
    async function getTaskSummary() {
      let userId = JSON.parse(localStorage.getItem('loggedInUser') || '');
      const res = await apiService.getTaskSummary({ userId, user });
      setTotalEarning(res?.totalEarning);
    }
    getTaskSummary();
  }, []);

  if (hide) return null;

  return (
    <>
      <MessageBox>
        <Block
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          })}>
          <Block>
            <LabelLarge>₹{totalEarning}</LabelLarge>
            <LabelLarge color={$theme.colors.contentSecondary}>Your Total Earnings</LabelLarge>
          </Block>
          <img src="/assets/money.png" />
        </Block>
      </MessageBox>
    </>
  );
};

export default EarningRingMessage;
