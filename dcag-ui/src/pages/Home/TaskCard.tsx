import React from 'react';
import { useTranslation } from 'react-i18next';
import TagFilled from '@uber/icons/tag-filled';
import { Block } from 'baseui/block';
import { useStyletron } from 'baseui';
import { LabelSmall, LabelXSmall } from 'baseui/typography';
import { TaskCategoryType } from '../../types/tasks-types';
import useStyles from '../../hooks/useStyles';
import { STYLE_PAGES } from '../../hooks/constants';
import FlexBox from '../../components/FlexBox';
import { to2DecimalPlaces } from '../../utils';

type Props = {
  category: TaskCategoryType;
  handleTaskCategory: (id: string) => void;
};

const NewTaskCard: React.FC<Props> = ({ category, handleTaskCategory }) => {
  const { t } = useTranslation();
  const [_, $theme] = useStyletron();
  const { categoryTitleStyle, taskCardStyles, thumbnailImageStyle, rateStyle, tagFilledIcon } =
    useStyles(STYLE_PAGES.HOME);
  const rate = to2DecimalPlaces(category.rate);

  return (
    <Block className={taskCardStyles} onClick={() => handleTaskCategory(category.id)}>
      <FlexBox justifyContent="center">
        <img src={category.imageSrc} className={thumbnailImageStyle} />
      </FlexBox>
      <Block>
        <LabelSmall className={categoryTitleStyle}>
          {t(`dcag.home.taskHub.${category.id}.title`)}
        </LabelSmall>
        <FlexBox alignItems="center" justifyContent="center">
          <TagFilled color={'#0E8345'} className={tagFilledIcon} />
          <LabelXSmall color={$theme.colors.contentTertiary} className={rateStyle}>
            ₹ {rate}/{t('dcag.home.text.task')}
          </LabelXSmall>
        </FlexBox>
      </Block>
    </Block>
  );
};

export default NewTaskCard;
