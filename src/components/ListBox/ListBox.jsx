// import { useTranslation, Trans } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import {
  ButtonMailWrap,
  IconCheck,
  InputCheck,
  MailCheck,
  MailDate,
  MailFrom,
  MailItem,
  MailItemWrap,
  MailTextWrapper,
  MailTheme,
  OpenIcon,
  SpamIcon,
  TrashIcon,
  TrashRestoreIcon,
  UnReadIcon,
  UnSpamIcon,
} from './Listbox.styled';

import { formatDate } from 'utils/date';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/auth/selectors';

const ListBox = () => {
  /* eslint-disable */
  const [
    mailArray,
    accentBox,
    handleNavigate,
    setCheckedMailArray,
    checkedMailArray,
    color,
    handleNavigateNew,
    dataD,
    setDataD,
    handleMove,
    handleFlags,
    handleDelete,
  ] = useOutletContext();
  const { itemPerPage } = useSelector(selectUser);
  const [searchParams] = useSearchParams();
  const path = searchParams.get('boxPath');
  const page = Number(searchParams.get('page'));

  const [mailList, setMailList] = useState([]);
  useEffect(() => {
    if (mailArray) {
      setMailList(mailArray);
    }
  }, [mailArray]);
  const handleCheckboxChange = (event, obj) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setCheckedMailArray(prevArray => [...prevArray, obj]);
    } else {
      setCheckedMailArray(prevArray =>
        prevArray.filter(item => item.id !== obj.id)
      );
    }
  };
  return (
    <>
      {[...mailList]
        ?.sort((a, b) => new Date(b.date) - new Date(a.date))
        ?.slice((page - 1) * itemPerPage, page * itemPerPage)
        .map(({ id, date, from, subject, unseen }) => {
          return (
            <MailItemWrap key={id}>
              <InputCheck
                type="checkbox"
                id={id}
                onChange={e =>
                  handleCheckboxChange(e, { id, date, from, subject, unseen })
                }
                checked={
                  checkedMailArray.findIndex(elem => elem.id === id) !== -1
                }
              />

              <MailCheck htmlFor={id} className="MailCheck">
                <IconCheck className="IconCheck" />
              </MailCheck>

              <MailItem
                unseen={unseen.toString()}
                onClick={() => {
                  handleFlags(true, { id, date, from, subject, unseen });
                  handleNavigate(id);
                }}
              >
                <MailTextWrapper>
                  <MailFrom>{from.name || 'я'}</MailFrom>
                  <MailTheme>{subject}</MailTheme>
                </MailTextWrapper>
                <MailDate className="unshow">
                  {formatDate(date, false)}
                </MailDate>
              </MailItem>
              <ButtonMailWrap className="show">
                <SpamIcon
                  path={path}
                  onClick={() => {
                    handleMove(
                      path,
                      accentBox?.mailboxes[
                        accentBox?.mailboxes.findIndex(
                          elem => elem.nameEn === 'Junk'
                        )
                      ]?.path
                    );
                  }}
                />
                <TrashIcon
                  path={path}
                  onClick={() => {
                    !['Trash', '[Gmail]/Кошик'].includes(path)
                      ? handleMove(
                          path,
                          accentBox?.mailboxes[
                            accentBox?.mailboxes.findIndex(
                              elem => elem.nameEn === 'Trash'
                            )
                          ]?.path
                        )
                      : handleDelete(path);
                  }}
                />
                <UnSpamIcon
                  path={path}
                  onClick={() => {
                    handleMove(path, 'INBOX');
                  }}
                />
                <TrashRestoreIcon
                  path={path}
                  onClick={() => {
                    handleMove(path, 'INBOX');
                  }}
                />

                <UnReadIcon
                  unseen={unseen.toString()}
                  onClick={() => {
                    handleFlags(false, { id, date, from, subject, unseen });
                  }}
                />
                <OpenIcon
                  unseen={unseen.toString()}
                  onClick={() => {
                    handleFlags(true, { id, date, from, subject, unseen });
                  }}
                />
              </ButtonMailWrap>
            </MailItemWrap>
          );
        })}
    </>
  );
};

export default ListBox;
