import React, { useEffect, useRef, useState } from 'react';
import {
  BackIcon,
  BackLinkIcon,
  ButtonWrap,
  CancelIcon,
  FormSearch,
  ForvardIcon,
  LoadIcon,
  OpenIcon,
  PageControl,
  PanelContainer,
  SearchIcon,
  SearchInput,
  SpamIcon,
  TaskIcon,
  TotalCount,
  TrashIcon,
  TrashRestoreIcon,
  UnReadIcon,
  UnSpamIcon,
} from './ControlPanelMail.styled';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useGetEmailsFromSearchQuery } from 'redux/emails/emailsApi';
import { useSelector } from 'react-redux';
import { selectId } from 'redux/local/selectors';
import AddTaskModal from 'components/AddTaskModal/AddTaskModal';
import {
  IconCheck,
  InputCheck,
  MailCheck,
} from 'components/ListBox/Listbox.styled';

const ControlPanelMail = ({
  box,
  path,
  itemPerPage,
  setMailArray,
  mailArray,
  setCheckedMailArray,
  checkedMailArray,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const idStorage = useSelector(selectId);
  const { uid, _id } = useParams();

  const [searchVisible, setSearchVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page'));
  const searchPam = searchParams.get('search');

  const [newCount, setNewCount] = useState(box?.countMail);
  const [searchValue, setSearchValue] = useState(searchPam ? searchPam : '');
  const [isModalOpen, setModalOpen] = useState(false);
  const { data: searchResults } = useGetEmailsFromSearchQuery(
    { _id, path, search: searchPam },
    { skip: !searchPam || uid }
  );
  useEffect(() => {
    if (box) setNewCount(box?.countMail);
  }, [box]);
  const handleOpenModal = () => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!uid) {
      const currentParams = Object.fromEntries(searchParams.entries());
      if (searchValue) {
        currentParams.search = searchValue;
        setSearchParams(currentParams);
      } else {
        delete currentParams.search;
      }
      if (searchResults?.search === searchValue) {
        setMailArray(searchResults?.searchResults?.listEmail);
      }
    } else {
      if (searchValue) {
        navigate(
          `mailbox/${idStorage}?boxPath=${path}&page=1&search=${searchValue}`,
          { state: { from: location } }
        );
        if (searchResults?.search === searchValue) {
          setMailArray(searchResults?.searchResults?.listEmail);
        }
      }
    }
  };
  const handleChange = e => {
    const inputValue = e.target.value;

    setSearchValue(inputValue);
  };

  useEffect(() => {
    const searchQueryParam = searchParams.get('search');
    if (searchQueryParam && searchQueryParam !== 'null') {
      console.log('obj :>> ', searchQueryParam);
      setSearchValue(searchQueryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (path) setNewCount(box?.countMail);
  }, [path]);

  useEffect(() => {
    if (!searchPam) {
      setMailArray(box?.mailList);
    }
  }, [searchResults, searchPam]);
  useEffect(() => {
    if (searchResults) {
      setMailArray(searchResults?.searchResults?.listEmail);
      setNewCount(searchResults?.searchResults?.listEmail.length);
    }
  }, [searchResults]);

  const handleAllChange = e => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setCheckedMailArray(
        mailArray.filter(
          elem =>
            elem.id >=
            (mailArray.length - 1 < page * itemPerPage - 1
              ? mailArray[mailArray.length - 1]?.id
              : mailArray[page * itemPerPage - 1]?.id)
        )
      );
    } else {
      setCheckedMailArray([]);
    }
  };
  return (
    <PanelContainer>
      <ButtonWrap prv={(!_id).toString()}>
        {!uid && (
          <>
            <InputCheck
              type="checkbox"
              id={'aa'}
              onChange={e => handleAllChange(e)}
            />
            <MailCheck htmlFor={'aa'} className="MailCheck panel">
              <IconCheck className="IconCheck" />
            </MailCheck>
          </>
        )}

        {!uid ? (
          <LoadIcon />
        ) : (
          <BackLinkIcon
            uid={uid}
            onClick={() => {
              if (searchPam) {
                navigate(
                  location.state?.from ??
                    `mailbox/${idStorage}?boxPath=${path}&page=1&search=${searchPam}`,
                  { state: { from: location } }
                );
              } else
                navigate(
                  location.state?.from ??
                    `mailbox/${idStorage}?boxPath=${path}&page=1`,
                  { state: { from: location } }
                );
            }}
          />
        )}
        {!['Junk', '[Gmail]/Спам'].includes(path) ? (
          <SpamIcon chekout={checkedMailArray.length} />
        ) : (
          <UnSpamIcon chekout={checkedMailArray.length} />
        )}
        {!['Trash', '[Gmail]/Кошик'].includes(path) ? (
          <TrashIcon chekout={checkedMailArray.length} />
        ) : (
          <TrashRestoreIcon chekout={checkedMailArray.length} />
        )}
        <UnReadIcon chekout={checkedMailArray.length} />
        <OpenIcon chekout={checkedMailArray.length} />
        <TaskIcon onClick={handleOpenModal} />
      </ButtonWrap>
      <FormSearch onSubmit={handleSubmit}>
        <SearchIcon
          className={searchVisible ? 'active-icon' : 'inactive-icon'}
          values={searchValue}
          onClick={() => {
            if (searchVisible) {
              const currentParams = Object.fromEntries(searchParams.entries());
              if (searchValue) {
                currentParams.search = searchValue;
                setSearchParams(currentParams);
              } else {
                delete currentParams.search;
              }
              if (searchResults?.search === searchValue) {
                setMailArray(searchResults?.searchResults?.listEmail);
              }
            } else setSearchVisible(true);
          }}
        />
        <CancelIcon
          className={searchVisible ? 'active-icon' : 'inactive-icon'}
          onClick={() => {
            setSearchVisible(false);
            const currentParams = Object.fromEntries(searchParams.entries());
            delete currentParams.search;
            setSearchParams(currentParams);
            setSearchValue('');
            setMailArray(box?.mailList);
          }}
        />
        <SearchInput
          value={searchValue}
          onChange={handleChange}
          className={searchVisible ? 'active-input' : 'inactive-input'}
        />
      </FormSearch>
      <PageControl>
        <TotalCount>
          {uid
            ? searchPam
              ? mailArray.findIndex(elem => elem.id === Number(uid)) + 1
              : newCount - Number(uid) + 1
            : `${(page - 1) * itemPerPage + 1} - 
          ${page * itemPerPage > newCount ? newCount : page * itemPerPage}`}
          {' з '}
          {newCount}
        </TotalCount>
        <BackIcon
          page={
            uid
              ? (
                  (searchPam
                    ? mailArray.findIndex(elem => elem.id === Number(uid))
                    : Number(uid)) < newCount
                ).toString()
              : (page > 1).toString()
          }
          onClick={() => {
            if (uid) {
              if (!searchPam && Number(uid) >= newCount) return;
              if (
                searchPam &&
                mailArray.findIndex(elem => elem.id === Number(uid)) === 0
              ) {
                return;
              }
              searchPam
                ? navigate(
                    `mail/${
                      mailArray[
                        mailArray.findIndex(elem => elem.id === Number(uid)) - 1
                      ].id
                    }?boxPath=${path}&page=${Math.ceil(
                      (mailArray.findIndex(elem => elem.id === Number(uid)) +
                        1) /
                        50
                    )}&search=${searchPam}`
                  )
                : navigate(
                    `mail/${Number(uid) + 1}?boxPath=${path}&page=${Math.ceil(
                      (newCount - Number(uid)) / 50
                    )}`
                  );
            } else {
              if (page <= 1) return;
              setSearchParams(params => {
                params.set('page', Number(page) - 1);
                return params;
              });
            }
          }}
        />
        <ForvardIcon
          page={(uid
            ? (Number(uid) <= 1).toString()
            : (page - 1) * itemPerPage < newCount &&
              page * itemPerPage >= newCount
          ).toString()}
          onClick={() => {
            if (uid) {
              if (Number(uid) <= 1) return;
              if (
                searchPam &&
                mailArray.findIndex(elem => elem.id === Number(uid)) ===
                  mailArray.length - 1
              )
                return;
              searchPam
                ? navigate(
                    `mail/${
                      mailArray[
                        mailArray.findIndex(elem => elem.id === Number(uid)) + 1
                      ].id
                    }?boxPath=${path}&page=${Math.ceil(
                      (mailArray.findIndex(elem => elem.id === Number(uid)) +
                        1) /
                        50
                    )}&search=${searchPam}`
                  )
                : navigate(
                    `mail/${Number(uid) - 1}?boxPath=${path}&page=${Math.ceil(
                      (newCount - Number(uid) + 2) / 50
                    )}`
                  );
            } else {
              if (
                (page - 1) * itemPerPage < newCount &&
                page * itemPerPage >= newCount
              )
                return;
              setSearchParams(params => {
                params.set('page', page + 1);
                return params;
              });
            }
          }}
        />
      </PageControl>
      {isModalOpen && <AddTaskModal onClose={handleCloseModal} />}
    </PanelContainer>
  );
};

export default ControlPanelMail;
