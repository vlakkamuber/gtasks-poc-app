import React from 'react';
import { useTranslation } from 'react-i18next';

const LoadMoreButton: React.FC<{ loadMore: (key: any) => Promise<void>; taskKey: string }> = ({
  loadMore,
  taskKey: key
}) => {
  const { t } = useTranslation();
  return (
    <div style={{ display: 'flex', justifyContent: 'right', cursor: 'pointer' }}>
      <span
        style={{
          fontSize: '1rem',
          fontWeight: 'normal',
          marginRight: '12px',
          textDecoration: 'underline',
          color: '#0000EE'
        }}
        onClick={() => loadMore(key)}>
        {t(`dcag.home.btn.loadMore.label`)}
      </span>
    </div>
  );
};

export default LoadMoreButton;
