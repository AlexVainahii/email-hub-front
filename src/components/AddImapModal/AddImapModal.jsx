import React from 'react';
import Modal from '../Modal';
import FeedbackForm from '../FeedbackForm';
import ImapForm from 'components/ImapForm';

const AddImapModal = ({
  onClose,
  initialSettings,
  setMailBoxArray,
  accentBox,
  setAccentBox,
}) => {
  return (
    <Modal onClose={onClose}>
      <ImapForm
        onClose={onClose}
        initialSettings={initialSettings}
        setMailBoxArray={setMailBoxArray}
        accentBox={accentBox}
        setAccentBox={setAccentBox}
      />
    </Modal>
  );
};

export default AddImapModal;
