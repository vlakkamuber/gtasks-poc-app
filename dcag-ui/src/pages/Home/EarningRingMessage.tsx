import React, { useEffect, useState } from 'react';
import MessageBox from '../../components/MessageBox';
import { Block } from 'baseui/block';
import { useStyletron } from 'baseui';
import { LabelLarge } from 'baseui/typography';
import apiService from '../../BE-services/apiService';
import { useUserAuth } from '../../context/UserAuthContext';
import FlexBox from '../../components/FlexBox';

type Props = {
  hide?: boolean;
};

const EarningRingMessage: React.FC<Props> = ({ hide = false }) => {
  const [_, $theme] = useStyletron();
  const [totalEarning, setTotalEarning] = useState();
  const { user } = useUserAuth();

  useEffect(() => {
    async function getTaskSummary() {
      const res = await apiService.getTaskSummary({ userId: user.uid, user });
      setTotalEarning(res?.totalEarning);
    }
    if (user) {
      getTaskSummary();
    }
  }, [user]);

  if (hide) return null;

  return (
    <>
      <MessageBox>
        <FlexBox justifyContent="space-between" alignItems="center">
          <Block>
            <LabelLarge>₹{totalEarning}</LabelLarge>
            <LabelLarge color={$theme.colors.contentSecondary}>Your Total Earnings</LabelLarge>
          </Block>
          <img src="/assets/money.png" />
        </FlexBox>
      </MessageBox>
    </>
  );
};

export default EarningRingMessage;
