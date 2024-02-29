
import { useHistory } from 'react-router-dom';
import { ListItem, ListItemLabel } from 'baseui/list';
import { useStyletron } from 'baseui';
import Page from '../../components/Page';
import { useTranslation } from 'react-i18next';
import { useUserAuth } from '../../context/UserAuthContext';
import useAnalytics from '../../hooks/useAnanlytics';
import { ANALYTICS_PAGE } from '../../constants/constant';
import { useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
const Account: React.FC = () => {
  const [css] = useStyletron();
  const { t } = useTranslation();
  const { logOut: firebaseLogOut } = useUserAuth();
  const logEvent = useAnalytics({ page: ANALYTICS_PAGE.account });
  useEffect(() => {
    logEvent({ actions: '' });
  }, []);
  const logOut = async () => {
    logEvent({ actions: 'click_logout' });
    await firebaseLogOut();
    history.push('/home');
    localStorage.clear();
    window.location.reload(true);
  };
  const history = useHistory();
  const goToReportBug = () => {
    logEvent({ actions: 'click_report_bug' });
    history.push('/dashboard/issue');
  };
  const goToTrainingModule = ()=>{
    logEvent({ actions: 'click_training_modules' })
    history.push('/dashboard/training');
  }
  return (
      <Page>
        <PageHeader page={ANALYTICS_PAGE.account} title={t(`dcag.account.page.heading`)} />
        <ul
          className={css({
            width: '375px',
            paddingLeft: 0,
            paddingRight: 0
          })}>
          <ListItem onClick={() => goToTrainingModule()}>
            <ListItemLabel>{t(`dcag.account.page.link.trainingmodule`)}</ListItemLabel>
          </ListItem>
          <ListItem >
            <ListItemLabel disabled={true}>{t(`dcag.account.page.link.help`)}</ListItemLabel>
          </ListItem>
          <ListItem onClick={() => goToReportBug()}>
            <ListItemLabel>{t(`dcag.account.page.link.reportBug`)}</ListItemLabel>
          </ListItem>
          <ListItem onClick={logOut}>
            <ListItemLabel>{t(`dcag.account.page.link.logout`)}</ListItemLabel>
          </ListItem>
        </ul>
        </Page>
  );
};

export default Account;
