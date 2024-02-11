import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton, SIZE, ROLE } from 'baseui/modal';
import { HeadingXSmall } from 'baseui/typography';
import CircleIFilled from '@uber/icons/circle-i-filled';
import { useHistory } from 'react-router-dom';

const Banner = ({ isOpen, setIsOpen }) => {
  const history = useHistory();

  return (
    <Modal
      onClose={() => setIsOpen(false)}
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.alertdialog}
      overrides={{
        Root: {
          style: ({ $theme }) => ({
            borderRadius: 0,
          })
        },
        Close: { component: null},
        Dialog: { style: { borderRadius: "0px",             padding: "20px"    } }
      }}>
      <ModalHeader style={{ display: "flex", justifyContent: "center" }}>
        <CircleIFilled size={64} style={{ color: "#276EF1" }} />
      </ModalHeader>
      <ModalBody style={{ display: "flex", justifyContent: "center" }}>
        <HeadingXSmall style={{ display: "flex", justifyContent: "center", textAlign: "center" }}>View training videos before performing the tasks</HeadingXSmall>
      </ModalBody>
      <ModalFooter style={{ display: "flex", justifyContent: "center" }}>
        <ModalButton onClick={() => {history.push('/dashboard/training')}}>Go to Training</ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default Banner;
