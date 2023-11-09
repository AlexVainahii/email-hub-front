import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import {
  AddBox,
  BoxCard,
  BoxList,
  ButtonCard,
  ButtonSlideLeft,
  ButtonSlideRight,
  Container,
  DeleteButton,
  SettingButton,
  ShowP,
  // ShowSpan,
  SiAppleI,
  SiGoogleI,
  SiMailgunI,
  SiMicrosoftoutlookI,
  SiProtonmailI,
  SiYahooI,
  SiZohoI,
  WrapBoxCard,
} from './ImapBox.styled';

import AddImapModal from 'components/AddImapModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDeleteImapEmailMutation } from 'redux/emails/emailsApi';
import { showSuccessToast } from 'utils/showToast';
import { useDispatch } from 'react-redux';
import { changeId, changePath } from 'redux/local/slice';

const ImapBox = ({
  mailBoxArray,
  setMailBoxArray,
  accentBox,
  setAccentBox,
  setColor,
  setCheckedMailArray,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [deleteImapEmail] = useDeleteImapEmailMutation();
  const iconOptions = [
    { value: 'mailbox-icon-1', label: 'Gmail', icon: <SiGoogleI /> },
    { value: 'mailbox-icon-2', label: 'Yahoo', icon: <SiYahooI /> },
    {
      value: 'mailbox-icon-3',
      label: 'Outlook',
      icon: <SiMicrosoftoutlookI />,
    },
    { value: 'mailbox-icon-4', label: 'Apple', icon: <SiAppleI /> },
    { value: 'mailbox-icon-5', label: 'Proton', icon: <SiProtonmailI /> },
    { value: 'mailbox-icon-6', label: 'Zoho', icon: <SiZohoI /> },
    { value: 'mailbox-icon-7', label: 'Mail', icon: <SiMailgunI /> },
  ];
  const [totalContainers] = useState(mailBoxArray?.length);
  const [containersPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [initialSettings, setInitialSettings] = useState(null);
  // const [totalPagesContain, setTotalPagesContain] = useState(
  //   mailBoxArray?.length % containersPerPage === 0
  //     ? mailBoxArray?.length / containersPerPage + 1
  //     : Math.ceil(mailBoxArray?.length / containersPerPage)
  // );

  const [isModalOpen, setModalOpen] = useState(false);
  const totalPages =
    totalContainers % containersPerPage === 0
      ? totalContainers / containersPerPage + 1
      : Math.ceil(totalContainers / containersPerPage);
  const handleDelete = async id => {
    const length = mailBoxArray.length;
    deleteImapEmail(id);
    showSuccessToast(t('addtask.succ3'));
    const newArrayBox = mailBoxArray.filter(elem => elem._id !== id);

    setMailBoxArray(newArrayBox);
    if (length === 1) {
      setAccentBox({});
      dispatch(changeId(null));
      dispatch(changePath(null));
      navigate(`mailbox/id`, { state: { from: location } });
      return;
    }

    if (accentBox._id === id) {
      dispatch(changeId(newArrayBox[0]._id));
      dispatch(changePath(newArrayBox[0].mailboxes[0].path));
      setAccentBox(newArrayBox[0]);
      navigate(
        `mailbox/${newArrayBox[0]._id}?boxPath=${newArrayBox[0].mailboxes[0].path}&page=1`,
        { state: { from: location } }
      );
    }
  };
  const handleOpenModal = () => {
    setInitialSettings(null);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const handleEditModal = elem => {
    setInitialSettings(elem);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  // const handleTotalContainersDec = () => {
  //   setTotalContainers(totalContainers - 1);
  // };

  // const handleTotalContainersAdd = () => {
  //   setTotalContainers(totalContainers + 1);
  // };
  return (
    <>
      <Container>
        <ButtonSlideLeft
          onClick={handlePreviousPage}
          style={{
            display: currentPage > 0 ? 'block' : 'none',
          }}
        >
          {'<'}{' '}
        </ButtonSlideLeft>
        <BoxList>
          {mailBoxArray?.map((elem, i) => {
            const iconIndex = iconOptions.findIndex(
              option => option.value === elem.iconBox
            );

            return (
              <WrapBoxCard
                key={elem.NumId}
                color={elem.color}
                border={elem.NumId === accentBox?.NumId}
              >
                <BoxCard
                  onClick={() => {
                    dispatch(changeId(elem._id));
                    dispatch(changePath(elem.mailboxes[0].path));
                    setAccentBox(elem);
                    setColor(elem.color);
                    if (elem._id !== accentBox._id) {
                      setCheckedMailArray([]);
                    }
                    navigate(
                      `mailbox/${elem._id}?boxPath=${elem.mailboxes[0].path}&page=1`,
                      { state: { from: location } }
                    );
                  }}
                  style={{
                    display:
                      i >= currentPage * containersPerPage &&
                      i < (currentPage + 1) * containersPerPage
                        ? 'flex'
                        : 'none',
                  }}
                >
                  {iconIndex !== -1 ? iconOptions[iconIndex].icon : null}
                  <ShowP>{elem.email}</ShowP>
                </BoxCard>
                <SettingButton
                  className="show"
                  onClick={() => handleEditModal(elem)}
                />
                <DeleteButton
                  className="show"
                  onClick={() => handleDelete(elem._id)}
                />
                {/* <ShowSpan messade={{}} /> */}
              </WrapBoxCard>
            );
          })}
          <WrapBoxCard>
            <BoxCard
              style={{
                display: currentPage >= totalPages - 1 ? 'block' : 'none',
              }}
            >
              <ButtonCard onClick={handleOpenModal}>
                <AddBox />
              </ButtonCard>
            </BoxCard>
          </WrapBoxCard>
        </BoxList>
        <ButtonSlideRight
          onClick={handleNextPage}
          style={{
            display: currentPage < totalPages - 1 ? 'block' : 'none',
          }}
        >
          {'>'}{' '}
        </ButtonSlideRight>
        {isModalOpen && (
          <AddImapModal
            onClose={handleCloseModal}
            initialSettings={initialSettings}
            setMailBoxArray={setMailBoxArray}
            accentBox={accentBox}
            setAccentBox={setAccentBox}
          />
        )}
      </Container>
    </>
  );
};

export default ImapBox;
