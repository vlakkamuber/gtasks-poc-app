import { useUserAuth } from '../context/UserAuthContext';
import apiService from '../BE-services/apiService';
import { getSessionId } from '../utils';

type useAnalyticsArgsType = {
  page: string;
};

type logEventArgsType = { actions: string; properties?: string; otherDetails?: string };

const useAnalytics = ({ page }: useAnalyticsArgsType) => {
  const { user } = useUserAuth();
  let userId = JSON.parse(localStorage.getItem('loggedInUser'));
  const sessionId = getSessionId(userId);
  const city = '';
  const userAgent = navigator.userAgent;
  const logEvent = async ({ actions, properties = '', otherDetails = '' }: logEventArgsType) => {
    await apiService.recordAnalytics(userId, user, {
      sessionId,
      actions,
      page,
      city,
      properties,
      otherDetails,
      userAgent
    });
  };
  return logEvent;
};

export default useAnalytics;
