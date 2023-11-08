import React, { useEffect, useState } from 'react';
import { useGetMailOneQuery } from 'redux/emails/emailsApi';
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/auth/selectors';
import { formatDate } from 'utils/date';
import {
  FromWrap,
  Iframe,
  ReSend,
  TitleAddress,
  TitleDate,
  TitleMail,
  TitleName,
  TitleWrap,
  UpSend,
  WrapTitle,
  Button,
  ButtonB,
} from './Mail.styled';

import ReactQuill from 'react-quill';
import { changeMail } from 'redux/local/slice';
import { useDispatch } from 'react-redux';

const Mail = () => {
  const [
    mailArray,
    accentBox,
    handleNavigate,
    setCheckedMailArray,
    checkedMailArray,
    color,
    handleNavigateNew,
  ] = useOutletContext();
  const { uid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const path = searchParams.get('boxPath');

  const { data: mail, refetch } = useGetMailOneQuery({
    id: accentBox?._id,
    path,
    uid: uid,
  });
  const {
    from: { name, address },
    subject,
    date,
  } = mailArray.find(elem => elem.id === Number(uid));

  const { itemPerPage } = useSelector(selectUser);

  const page = Number(searchParams.get('page'));

  useEffect(() => {
    const iframe = document.getElementById('mailIframe');
    dispatch(changeMail(mail?.mail?.htmlContent));
    if (iframe) {
      iframe.srcdoc = mail?.mail?.htmlContent || '';
    }
  }, [mail]);

  return (
    <WrapTitle>
      <TitleMail>{subject}</TitleMail>
      <TitleWrap>
        <FromWrap>
          <TitleName>{name}</TitleName>
          <TitleAddress>
            {' <'}
            {address}
            {'>'}
          </TitleAddress>

          <TitleDate>{formatDate(date, false, true)}</TitleDate>
        </FromWrap>
        <FromWrap>
          <UpSend
            color={color}
            onClick={() => {
              handleNavigateNew(true, uid);
            }}
          />
          <ReSend
            color={color}
            onClick={() => {
              handleNavigateNew(false);
            }}
          />
        </FromWrap>
      </TitleWrap>
      <Iframe id="mailIframe" title="Mail Content"></Iframe>

      <ButtonB
        color={color}
        onClick={() => {
          handleNavigateNew(true, uid);
        }}
      >
        Відповісти{' '}
      </ButtonB>
      <Button
        color={color}
        onClick={() => {
          handleNavigateNew(false);
        }}
      >
        Переслати
      </Button>
    </WrapTitle>
  );
};

export default Mail;
