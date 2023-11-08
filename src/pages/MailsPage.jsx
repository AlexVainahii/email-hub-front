// import { useTranslation, Trans } from 'react-i18next';

import ImageAnimation from 'components/Bandero-goose/ImageAnimation';
import ControlPanelMail from 'components/ControlPanelMail';
import ImapBox from 'components/ImapBox';
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
  SendIcon,
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
  const idStorage = useSelector(selectId);
  const pathStorage = useSelector(selectPath);
  const pageStorage = useSelector(selectPage);
  const dispatch = useDispatch();
  const { data: allListBox } = useGetAllBoxQuery();
  const { _id, uids } = useParams();
  const [searchParams] = useSearchParams();
  const path = searchParams.get('boxPath');
  const [serverPage, setServerPage] = useState(1);
  const page = Number(searchParams.get('page'));
  const search = searchParams.get('search');
  const { data: allList } = useGetEmailsFromBoxQuery(
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
        dispatch([]);
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
                  const newMailList = [...existingMessages, ...uniqueMessages];

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
      console.log('viiiii1 :>> ', accentBox);
      setColor(accentBox?.color);
      setMailArray(
        accentBox?.mailboxes?.find(elem => elem.path === path)?.mailList
      );
    }
  }, [accentBox, path]);
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
              <CategoriesItem color={color}>
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
            {!uids ? (
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
              />
            ) : null}{' '}
            <Mailbox uids={(!uids).toString()}>
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
