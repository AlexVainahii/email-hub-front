import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  WrapTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Li,
  ButtonB,
  CancelIcon,
} from './NewMail.styled';
import {
  useLocation,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { SendIcon } from 'components/ListBox/Listbox.styled';
import { Iframe } from 'components/Mail/Mail.styled';
import { useSelector } from 'react-redux';
import { selectMail } from 'redux/local/selectors';
import { useSendEmailMutation } from 'redux/emails/emailsApi';

const NewMail = () => {
  /* eslint-disable */
  const [
    mailArray,
    accentBox,
    handleNavigate,
    setCheckedMailArray,
    checkedMailArray,
    color,
    handleNavigateNew,
  ] = useOutletContext();
  /* eslint-disable */
  const mail = useSelector(selectMail);

  const { uids } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const path = searchParams.get('boxPath');
  const resend = searchParams.get('resend');
  const upsend = searchParams.get('upsend');
  const [text, setText] = useState(resend === 'true' ? mail : '');
  const uid = searchParams.get('uid');
  const [sendEmail] = useSendEmailMutation();
  const [recipient, setRecipient] = useState(
    uid
      ? `${mailArray.find(elem => elem.id === Number(uid))?.from?.name}<${
          mailArray.find(elem => elem.id === Number(uid))?.from?.address
        }>`
      : ''
  );
  const [subject, setSubject] = useState(
    uid ? `re: ${mailArray.find(elem => elem.id === Number(uid))?.subject}` : ''
  );

  const handleChange = value => {
    setText(value);
  };

  const handleRecipientChange = e => {
    setRecipient(e.target.value);
  };

  const handleSubjectChange = e => {
    setSubject(e.target.value);
  };

  const handleSend = async e => {
    e.preventDefault();
    console.log('{ recipient, subject, text, _id: uids } :>> ', {
      recipient: recipient,
      subject: subject,
      text: text,
      _id: uids,
    });
    const answer = await sendEmail({ recipient, subject, text, _id: uids }); // Отримайте значення recipient, subject і text та надішліть їх на сервер
    console.log('Відправлено:');
    console.log('Отримувач:', answer);
  };
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video', 'sticker'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'font',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'sticker',
  ];
  useEffect(() => {
    console.log('mail,dataD :>> ', mail);
    // Отримання посилання на iframe
    const iframe = document.getElementById('mailIframeNew');
    if (uid) setText(`Ваша Відповідь: <br><br><br><br>${mail}`);
    // Встановлення вмісту HTML-повідомлення у srcdoc атрибуті iframe
    if (iframe) {
      iframe.srcdoc = mail || '';
    }
  }, [mail]);
  return (
    <Li>
      {upsend === 'true' || resend === 'true' ? null : (
        <WrapTitle>
          <h2>Новий лист</h2>
        </WrapTitle>
      )}
      <Form>
        <FormGroup>
          <Label>Отримувач:</Label>
          <Input
            type="email"
            value={recipient}
            onChange={handleRecipientChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Тема:</Label>
          <Input type="text" value={subject} onChange={handleSubjectChange} />
        </FormGroup>
        {resend === 'true' && (
          <Iframe id="mailIframeNew" title="Mail Content"></Iframe>
        )}
        {upsend === 'true' && (
          <ReactQuill
            value={text}
            onChange={handleChange}
            modules={modules}
            formats={formats}
            style={{ height: '65%' }}
          />
        )}
        <ButtonB
          to={location.state?.from ?? `mailbox/${uids}?boxPath=${path}&page=1`}
          color={color}
        >
          Відмінити <CancelIcon />
        </ButtonB>
        <Button color={color} onClick={handleSend}>
          {resend === 'true' ? 'Переслати' : 'Відправити'} <SendIcon />
        </Button>
      </Form>
    </Li>
  );
};

export default NewMail;
