import { useUserAuth } from '../context/UserAuthContext';
import apiService from '../pages/apiService';
import getSessionId from '../utils/getSessionId';

type useAnalyticsArgsType = {
  page: string;
};

type logEventArgsType = { actions: string; properties?: string; otherDetails?: string };

const useAnalytics = ({ page }: useAnalyticsArgsType) => {
  const { user } = useUserAuth();
  let userId = JSON.parse(localStorage.getItem('loggedInUser'));
  const sessionId = getSessionId(userId);
  const city = '';
  const logEvent = async ({ actions, properties, otherDetails }: logEventArgsType) => {
    await apiService.recordAnalytics(userId, user, {
      sessionId,
      actions,
      page,
      city,
      properties,
      otherDetails
    });
  };
  return logEvent;
};

export default useAnalytics;
