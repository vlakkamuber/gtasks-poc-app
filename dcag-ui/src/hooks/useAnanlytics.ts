import { useUserAuth } from '../context/UserAuthContext';
import apiService from '../pages/apiService';

type useAnalyticsArgsType = {
  page: string;
  city: string;
};

type logEventArgsType = { actions: string; properties?: string; otherDetails?: string };

const useAnalytics = ({ page, city }: useAnalyticsArgsType) => {
  const { user } = useUserAuth();
  let userId = JSON.parse(localStorage.getItem('loggedInUser'));
  const sessionId = 'test';
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
