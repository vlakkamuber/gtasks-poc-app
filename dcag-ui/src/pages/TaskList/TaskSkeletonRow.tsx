import React from 'react';
import { Skeleton } from 'baseui/skeleton';

const TaskSkeletonRow: React.FC = () => {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'space-between', marginTop: 15, marginBottom: 15 }}>
      <div style={{ flex: 1 }}>
        <div>
          <Skeleton
            animation
            rows={0}
            height="20px"
            width="60%"
            overrides={{
              Row: {
                style: {
                  height: '20px'
                }
              }
            }}
          />
          <Skeleton
            animation
            rows={0}
            height="20px"
            width="20%"
            overrides={{
              Row: {
                style: {
                  height: '20px'
                }
              }
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            width: '80%'
          }}>
          <Skeleton
            animation
            rows={0}
            height="20px"
            width="100px"
            overrides={{
              Row: {
                style: {
                  height: '20px'
                }
              }
            }}
          />
          <Skeleton
            animation
            rows={0}
            height="20px"
            width="100px"
            overrides={{
              Row: {
                style: {
                  height: '20px'
                }
              }
            }}
          />
        </div>
      </div>
      <Skeleton
        animation
        rows={1}
        height="40px"
        width="30%"
        overrides={{
          Row: {
            style: {
              height: '40px',
              borderRadius: '20px'
            }
          }
        }}
      />
    </div>
  );
};

export default TaskSkeletonRow;
