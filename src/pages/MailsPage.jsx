// import { useTranslation, Trans } from 'react-i18next';

import ImageAnimation from 'components/Bandero-goose/ImageAnimation';
import ControlPanelMail from 'components/ControlPanelMail';
import ImapBox from 'components/ImapBox';
import ListBox from 'components/ListBox';
import {
  CategoriesItem,
  CategoriesList,
  CategoriesListWrap,
  CategoriesTitle,
  ContainerL,
  ContainerWrapperL,
  CreateIcon,
  Mailbox,
  MailboxWrap,
  MailboxWraper,
  NameBox,
  SendButton,
  UnseenBox,
} from 'components/ListBox/Listbox.styled.js';
import { Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { selectUser } from 'redux/auth/selectors';
import {
  useGetAllBoxQuery,
  useGetEmailsFromBoxQuery,
  useDeleteEmailMutation,
  useFlagsEmailMutation,
  useMoveEmailMutation,
} from 'redux/emails/emailsApi';
import {
  selectId,
  selectListBox,
  selectPage,
  selectPath,
} from 'redux/local/selectors';
import {
  changeId,
  changeLocal,
  changePage,
  changePath,
} from 'redux/local/slice';

const MailsPage = () => {
  // const { t } = useTranslation();
  const location = useLocation();
  const { itemPerPage } = useSelector(selectUser);
  const boxStorage = useSelector(selectListBox);
  const [deleteEmail] = useDeleteEmailMutation();
  const [moveEmail] = useMoveEmailMutation();
  const [flagsEmail] = useFlagsEmailMutation();
  const idStorage = useSelector(selectId);
  const pathStorage = useSelector(selectPath);
  const pageStorage = useSelector(selectPage);
  const dispatch = useDispatch();
  const { data: allListBox } = useGetAllBoxQuery();
  const { _id, uid, uids } = useParams();
  // console.log('_id :>> ', _id);
  const [searchParams] = useSearchParams();
  const path = searchParams.get('boxPath');
  const [serverPage, setServerPage] = useState(1);
  const page = Number(searchParams.get('page'));
  const search = searchParams.get('search');
  const { data: allList, refetch } = useGetEmailsFromBoxQuery(
    {
      _id,
      path,
      page: serverPage,
    },
    {
      skip:
        _id === 'id' ||
        _id === null ||
        _id === undefined ||
        path == null ||
        (page !== 1 && (page + 8) % 10 !== 0 && page % 10 !== 0) ||
        !!search,
    }
  );

  const [params] = useSearchParams();
  const boxPath = params.get('boxPath') || '';
  const [allBoxes, setAllBoxes] = useState(boxStorage);
  const [accentBox, setAccentBox] = useState(
    boxStorage.find(elem => elem._id === idStorage) && {}
  ); // Кількість контейнерів, які відображаються одночасно
  const [color, setColor] = useState(
    boxStorage.find(elem => elem._id === idStorage)?.color
  );
  const [mailArray, setMailArray] = useState(
    boxStorage
      ?.find(elem => elem._id === idStorage)
      ?.mailboxes?.find(elem => elem.path === pathStorage)?.mailList
  );
  const [checkedMailArray, setCheckedMailArray] = useState([]);
  const [dataD, setDataD] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    console.log('checkedMailArray :>> ', checkedMailArray);
    console.log(
      'checkedMailArray.filter(elem => !elem.unseen).length :>> ',
      checkedMailArray.filter(elem => elem.unseen === 'false').length
    );
  }, [checkedMailArray]);
  useEffect(() => {
    if (page === 1) setServerPage(page);
    if ((page + 8) % 10 === 0) setServerPage((page + 8) / 10 + 1);
  }, [page]);

  useEffect(() => {
    if (allListBox !== undefined) {
      const {
        data: { listImap },
      } = allListBox;
      dispatch(changeLocal(listImap));
      setAllBoxes(listImap || []);

      if (listImap.length === 0) {
        dispatch(changeLocal([]));
        dispatch(changeId(null));
        dispatch(changePath(null));

        navigate(`mailbox/id`, { state: { from: location } });
      } else {
        dispatch(changeLocal(listImap));
        setAllBoxes(listImap || []);
        if (
          !idStorage ||
          listImap.findIndex(elem => elem._id === idStorage) === -1
        ) {
          console.log('asdada2 :>> ');
          dispatch(changeId(listImap[0]._id));
          dispatch(changePath(listImap[0].mailboxes[0].path));
          setAccentBox(listImap[0]);
          setColor(listImap[0]?.color);
        } else {
          console.log('asdada3 :>> ');
          setAccentBox(boxStorage.find(elem => elem._id === idStorage));
          setColor(boxStorage.find(elem => elem._id === idStorage).color);
        }
        if (
          !pathStorage &&
          listImap
            .find(elem => elem.id === idStorage)
            ?.mailboxes.findIndex(elem => elem.path === pathStorage) === -1
        ) {
          dispatch(changePath(listImap[0].mailboxes[0].path));
        }
        if (_id) {
          navigate(
            `mailbox/${idStorage || listImap[0]._id}?boxPath=${
              pathStorage || listImap[0].mailboxes[0].path
            }&page=${pageStorage || 1}`,
            { state: { from: location } }
          );
        }
        if (!_id && !uid && !uids)
          navigate(
            `mailbox/${idStorage || listImap[0]._id}?boxPath=${
              pathStorage || listImap[0].mailboxes[0].path
            }&page=${pageStorage || 1}`,
            { state: { from: location } }
          );
      }
    }
  }, [allListBox]);

  useEffect(() => {
    if (idStorage && pageStorage && pathStorage) {
      setAccentBox(boxStorage.find(elem => elem._id === idStorage));
      setColor(boxStorage.find(elem => elem._id === idStorage).color);
      navigate(
        `mailbox/${idStorage}?boxPath=${pathStorage}&page=${pageStorage}`,
        { state: { from: location } }
      );
    }
  }, []);

  useEffect(() => {
    if (allList && allBoxes) {
      refetch();
      const indexBox = allBoxes.findIndex(box => box._id === allList._id);
      const indexMailBox = accentBox?.mailboxes?.findIndex(
        box => box.path === allList.path
      );

      if (indexBox !== -1 && indexMailBox !== -1) {
        const newMessages = allList.listEmail;
        const updatedAllBoxes = allBoxes.map(box => {
          if (box._id === allList._id) {
            return {
              ...box,
              mailboxes: box.mailboxes.map(mailBox => {
                if (mailBox.path === allList.path) {
                  const existingMessages = mailBox.mailList;
                  const uniqueMessages = newMessages.filter(
                    message =>
                      !existingMessages.some(
                        existingMessage => existingMessage.id === message.id
                      )
                  );

                  const newMailList =
                    allList.page === '1'
                      ? [...newMessages].sort((a, b) => b.id - a.id)
                      : [...existingMessages, ...uniqueMessages].sort(
                          (a, b) => b.id - a.id
                        );

                  // Сортування за спаданням ID
                  newMailList.sort((a, b) => b.id - a.id);

                  return {
                    ...mailBox,
                    countMailUnseen: allList.countMailUnseen,
                    countMail: allList.countMail,
                    mailList: newMailList,
                  };
                }
                return mailBox;
              }),
            };
          }
          return box;
        });

        dispatch(changeLocal(updatedAllBoxes));
        setAllBoxes(updatedAllBoxes);

        if (accentBox._id === allList._id) {
          setAccentBox(updatedAllBoxes[indexBox]);
          console.log('viiiii :>> ');
        }
      }
    }
  }, [allList]);

  useEffect(() => {
    if (!search) {
      setMailArray(
        accentBox?.mailboxes?.find(elem => elem.path === path)?.mailList
      );
    }
  }, [accentBox, path]);
  useEffect(() => {
    if (!search) {
      console.log('Прийшла Заміна:>> ', accentBox);
      dispatch(
        changeLocal(
          boxStorage.map(elem => {
            if (elem._id === accentBox._id) {
              return accentBox;
            }
            return elem;
          })
        )
      );
      setAllBoxes(
        boxStorage.map(elem => {
          if (elem._id === accentBox._id) {
            return accentBox;
          }
          return elem;
        })
      );
      setColor(accentBox?.color);
      setMailArray(
        accentBox?.mailboxes?.find(elem => elem.path === path)?.mailList
      );
    }
  }, [accentBox]);
  const handleNavigate = id => {
    search
      ? navigate(
          `mail/${id}?boxPath=${path}&page=${Math.ceil(
            (mailArray.findIndex(elem => elem.id === Number(id)) + 1) / 50
          )}&search=${search}`,
          {
            state: { from: location },
          }
        )
      : navigate(`mail/${id}?boxPath=${path}&page=${page}`, {
          state: { from: location },
        });
  };
  const handleNavigateNew = (boolean, uid) => {
    boolean
      ? navigate(
          `newmail/${_id}?boxPath=${path}&page=${page}&upsend=true&uid=${uid}`,
          {
            state: { from: location },
          }
        )
      : navigate(
          `newmail/${accentBox?._id}?boxPath=${path}&page=${page}&resend=true`,
          {
            state: { from: location },
          }
        );
  };

  const handleMove = async (fromPath, toPath, uids) => {
    const newArray = !uids ? checkedMailArray.map(elem => elem.id) : [uids.id];
    await moveEmail({
      _id,
      fromPath,
      toPath,
      mailList: newArray,
    });

    setAccentBox(prev => {
      const mailboxIndexFrom = prev.mailboxes.findIndex(
        elem => elem.path === fromPath
      );
      const mailboxIndexTo = prev.mailboxes.findIndex(
        elem => elem.path === toPath
      );

      const updatedMailboxes = [...prev.mailboxes];
      updatedMailboxes[mailboxIndexFrom] = {
        ...updatedMailboxes[mailboxIndexFrom],
        mailList: updatedMailboxes[mailboxIndexFrom].mailList
          .filter(elem => !newArray.includes(elem.id))
          .map(elem => {
            return {
              ...elem,
              id:
                elem.id -
                newArray.filter(el => {
                  return el < elem.id;
                }).length,
            };
          }),
        countMail:
          updatedMailboxes[mailboxIndexFrom].countMail - newArray.length,
        countMailUnseen:
          updatedMailboxes[mailboxIndexFrom].countMailUnseen -
          (!uids
            ? checkedMailArray.filter(elem => {
                return elem.unseen === true;
              }).length
            : uids.unseen === true
            ? 1
            : 0), // Оновлюємо mailList
      };

      updatedMailboxes[mailboxIndexTo] = {
        ...updatedMailboxes[mailboxIndexTo],
        mailList: [
          ...updatedMailboxes[mailboxIndexTo].mailList,
          ...(uids ? [uids] : checkedMailArray),
        ]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((elem, index) => {
            return {
              ...elem,
              id:
                updatedMailboxes[mailboxIndexTo].countMail +
                newArray.length -
                index,
            };
          }),
        countMail: updatedMailboxes[mailboxIndexTo].countMail + newArray.length,
        countMailUnseen:
          updatedMailboxes[mailboxIndexTo].countMailUnseen +
          (!uids
            ? checkedMailArray.filter(elem => {
                return elem.unseen === true;
              }).length
            : uids.unseen === true
            ? 1
            : 0), // Оновлюємо mailList
      };

      setCheckedMailArray([]);
      return {
        ...prev,
        mailboxes: updatedMailboxes,
      }; // Оновлюємо mailboxes в accentBox та повертаємо оновлений об'єкт accentBox
    });
  };

  const handleFlags = async (bool, uids) => {
    if (
      checkedMailArray.filter(elem => elem.unseen === !bool).length ===
        checkedMailArray.length &&
      uid
    )
      return;

    const newArray = !uids ? checkedMailArray.map(elem => elem.id) : [uids.id];
    flagsEmail({
      _id,
      path,
      mailList: newArray,
      seen: !bool,
    });

    setAccentBox(prev => {
      const mailboxIndex = prev.mailboxes.findIndex(elem => elem.path === path);

      const updatedMailboxes = [...prev.mailboxes];
      updatedMailboxes[mailboxIndex] = {
        ...updatedMailboxes[mailboxIndex],
        mailList: updatedMailboxes[mailboxIndex].mailList.map(elem => {
          if (newArray.includes(elem.id)) return { ...elem, unseen: !bool };
          return elem;
        }),
        countMailUnseen: bool
          ? updatedMailboxes[mailboxIndex].countMailUnseen -
            (!uids
              ? checkedMailArray.filter(elem => {
                  return elem.unseen === true;
                }).length
              : uids.unseen === true
              ? 1
              : 0)
          : updatedMailboxes[mailboxIndex].countMailUnseen +
            (!uids
              ? checkedMailArray.filter(elem => {
                  return elem.unseen === false;
                }).length
              : uids.unseen === false
              ? 1
              : 0), // Оновлюємо mail
      };

      setCheckedMailArray([]);
      return {
        ...prev,
        mailboxes: updatedMailboxes,
      }; // Оновлюємо mailboxes в accentBox та повертаємо оновлений об'єкт accentBox
    });
  };
  const handleDelete = async (path, uids) => {
    const newArray = !uids ? checkedMailArray.map(elem => elem.id) : [uids.id];
    await deleteEmail({
      _id,
      path,
      mailList: newArray,
    });

    setAccentBox(prev => {
      const mailboxIndex = prev.mailboxes.findIndex(elem => elem.path === path);

      const updatedMailboxes = [...prev.mailboxes];
      updatedMailboxes[mailboxIndex] = {
        ...updatedMailboxes[mailboxIndex],
        mailList: updatedMailboxes[mailboxIndex].mailList
          .filter(elem => !newArray.includes(elem.id))
          .map(elem => {
            return {
              ...elem,
              id:
                elem.id -
                newArray.filter(el => {
                  return el < elem.id;
                }).length,
            };
          }),
        countMail: updatedMailboxes[mailboxIndex].countMail - newArray.length,
        countMailUnseen:
          updatedMailboxes[mailboxIndex].countMailUnseen -
          (!uids
            ? checkedMailArray.filter(elem => {
                return elem.unseen === true;
              }).length
            : uids.unseen === true
            ? 1
            : 0), // Оновлюємо mailList
      };

      setCheckedMailArray([]);
      return {
        ...prev,
        mailboxes: updatedMailboxes,
      }; // Оновлюємо mailboxes в accentBox та повертаємо оновлений об'єкт accentBox
    });
  };
  return (
    <ContainerWrapperL>
      <ContainerL>
        <ImapBox
          mailBoxArray={allBoxes}
          setMailBoxArray={setAllBoxes}
          accentBox={accentBox}
          setAccentBox={setAccentBox}
          setColor={setColor}
          setCheckedMailArray={setCheckedMailArray}
        />
        <MailboxWraper>
          <CategoriesListWrap>
            <CategoriesTitle color={accentBox?.color}>
              {accentBox?.email}
            </CategoriesTitle>
            <CategoriesList>
              {accentBox?.mailboxes?.map(
                ({ _id, path, nameUa, countMailUnseen }) => (
                  <CategoriesItem
                    key={_id}
                    color={color}
                    active={path === boxPath}
                    onClick={() => {
                      dispatch(changePath(path));
                      if (path !== boxPath) {
                        setCheckedMailArray([]);
                      }
                      navigate(
                        `mailbox/${accentBox?._id}?boxPath=${path}&page=1`,
                        { state: { from: location } }
                      );
                    }}
                  >
                    <NameBox>{nameUa}</NameBox>

                    <UnseenBox>
                      {countMailUnseen === 0 ? '' : countMailUnseen}
                    </UnseenBox>
                  </CategoriesItem>
                )
              )}
              <CategoriesItem ids={_id} color={color}>
                <SendButton
                  to={`newmail/${
                    _id ? _id : uids
                  }?boxPath=${path}&page=1&resend=false&upsend=true`}
                  state={{ from: location }}
                  color={color}
                >
                  {' '}
                  Написати
                  <CreateIcon />
                </SendButton>
              </CategoriesItem>
            </CategoriesList>
          </CategoriesListWrap>

          <MailboxWrap>
            {uid || _id ? (
              <ControlPanelMail
                box={accentBox?.mailboxes?.find(
                  mailBox => mailBox.path === boxPath
                )}
                path={boxPath}
                itemPerPage={itemPerPage}
                setMailArray={setMailArray}
                mailArray={mailArray}
                setCheckedMailArray={setCheckedMailArray}
                checkedMailArray={checkedMailArray}
                setAccentBox={setAccentBox}
                accentBox={accentBox}
                handleMove={handleMove}
                handleFlags={handleFlags}
                handleDelete={handleDelete}
              />
            ) : null}{' '}
            <Mailbox uids={(!uids).toString()} ids={_id}>
              <Suspense fallback={<ImageAnimation />}>
                <Outlet
                  context={[
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
                  ]}
                />
              </Suspense>
            </Mailbox>
          </MailboxWrap>
        </MailboxWraper>
      </ContainerL>
    </ContainerWrapperL>
  );
};

export default MailsPage;
