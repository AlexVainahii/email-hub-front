import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import {
  FormWrapper,
  FormTitle,
  FormGroup,
  Label,
  Input,
  BtnWrapper,
  Btn,
  Checkbox,
  SiGoogleI,
  SiYahooI,
  SiMicrosoftoutlookI,
  SiAppleI,
  SiProtonmailI,
  SiZohoI,
  SiMailgunI,
  FormGroupI,
  SettingsTitle,
} from './ImapForm.styled';
import {
  useCreateImapEmailMutation,
  useEditImapEmailMutation,
} from '../../redux/emails/emailsApi';
import CustomSelect from 'components/CustomSelect/CustomSelect';
import ColorPicker from 'components/ColorPicker';
import { showErrorToast, showSuccessToast } from 'utils/showToast';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { selectListBox } from 'redux/local/selectors';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeLocal } from 'redux/local/slice';
import { override } from 'components/Bandero-goose/ImageAnimation.styled';
import { MoonLoader } from 'react-spinners';

const ImapForm = ({
  onClose,
  initialSettings,
  setMailBoxArray,
  setAccentBox,
}) => {
  const { t } = useTranslation();
  const listBox = useSelector(selectListBox);
  const { _id } = useParams();
  const navigate = useNavigate();
  const [color, setColor] = useState(initialSettings?.color || '#007bff');
  const [icon, setIcon] = useState(
    initialSettings?.iconBox || 'mailbox-icon-7'
  );
  const location = useLocation();
  console.log('initialSettings :>> ', initialSettings);
  const dispatch = useDispatch();
  const [host, setHost] = useState(initialSettings?.host || 'imap.gmail.com');
  const [port, setPort] = useState(initialSettings?.port || '993');
  const [username, setUsername] = useState(initialSettings?.email || '');
  const [pass, setPass] = useState('');
  const [secure, setSecure] = useState(initialSettings?.secure && true);
  const [smtpSecure, setSmtpSecure] = useState(
    initialSettings?.smtpSecure && true
  );
  const [smtpHost, setSmtpHost] = useState(
    initialSettings?.smtpHost || 'smtp.gmail.com'
  );
  const [smtpPort, setSmtpPort] = useState(initialSettings?.smtpPort || '587');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('Початкове завантаження даних');
  const [createImapEmail] = useCreateImapEmailMutation();
  const [editImapEmail] = useEditImapEmailMutation();

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

  const handleSave = async () => {
    const newSettings = {
      iconBox: icon,
      color,
      host,
      port: Number(port),
      email: username,
      pass,
      secure,
      smtpSecure,
      smtpHost,
      smtpPort: Number(smtpPort),
    };
    setIsLoading(true);
    // Створюємо новий об'єкт, який містить лише поля зі змінами порівняно з initialSettings

    // Додайте сюди поля для SMTP налаштувань

    try {
      if (initialSettings) {
        setMessage('Зміни в конфігурації');
        setIsLoading(true);
        const changedSettings = {};
        for (const key in newSettings) {
          if (newSettings[key] !== initialSettings[key]) {
            if (key === 'pass' && pass.trim() === '') {
              continue;
            }
            changedSettings[key] = newSettings[key];
          }
        }

        const editBox = await editImapEmail({
          id: initialSettings._id,
          ...changedSettings,
        });
        if (_id === initialSettings._id) {
          setAccentBox(editBox.data?.data);
        }
        dispatch(
          changeLocal(
            listBox.map(elem => {
              if (elem._id === initialSettings._id) {
                return editBox.data?.data;
              } else {
                return elem;
              }
            })
          )
        );
        setMailBoxArray(prev =>
          prev.map(elem => {
            if (elem._id === initialSettings._id) {
              return editBox.data?.data;
            } else {
              return elem;
            }
          })
        );

        showSuccessToast(t('addtask.succ1'));
      } else {
        // Тут виконайте ваш запит на створення нових налаштувань, використовуючи changedSettings
        setMessage('Початкове завантаження даних');
        setIsLoading(true);
        const newBox = await createImapEmail(newSettings);
        if (newBox.data.hasOwnProperty('error')) {
          showErrorToast(t('addtask.err4'));
          return;
        }
        setMailBoxArray(prev => [...prev, newBox.data?.data]);
        showSuccessToast(t('addtask.succ2'));
        if (_id === 'id') setAccentBox(newBox.data?.data);
        navigate(
          `mailbox/${newBox.data?.data?._id}?boxPath=${newBox.data?.data?.mailboxes[0]?.path}&page=1`,
          { state: { from: location } }
        );
      }
      onClose();
    } catch (error) {
      showErrorToast(t('addtask.err3'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormWrapper>
        <FormGroupI>
          <FormTitle>Налаштування поштової адреси</FormTitle>
        </FormGroupI>

        <FormGroup>
          <Label htmlFor="icon">Іконка:</Label>
          <CustomSelect // Використовуємо кастомний селект
            options={iconOptions}
            color={color}
            selectedValue={icon}
            onChange={setIcon}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="color">Колір піктограми:</Label>
          <ColorPicker color={color} onChange={setColor} />
          <Label htmlFor="useTls">Використовувати TLS:</Label>
          <Checkbox
            type="checkbox"
            id="useTls"
            name="useTls"
            checked={secure}
            onChange={e => setSecure(e.target.checked)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="username">Поштова адреса:</Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>
        <SettingsTitle>Налаштування IMAP</SettingsTitle>
        <FormGroup>
          <Label htmlFor="host">Хост:</Label>
          <Input
            type="text"
            id="host"
            name="host"
            value={host}
            onChange={e => setHost(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="port">Порт:</Label>
          <Input
            type="text"
            id="port"
            name="port"
            value={port}
            onChange={e => setPort(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="pass">Пароль для додатків:</Label>
          <Input
            type="password"
            id="pass"
            name="pass"
            value={pass}
            onChange={e => setPass(e.target.value)}
          />
        </FormGroup>
        <SettingsTitle>Налаштування SMPT</SettingsTitle>
        <FormGroup>
          <Label htmlFor="smtpHost">Хост:</Label>
          <Input
            type="text"
            id="smtpHost"
            name="smtpHost"
            value={smtpHost}
            onChange={e => setSmtpHost(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="smtpPort">Порт</Label>
          <Input
            type="text"
            id="smtpPort"
            name="smtpPort"
            value={smtpPort}
            onChange={e => setSmtpPort(e.target.value)}
          />
        </FormGroup>
        <FormGroup style={{ justifyContent: 'flex-end', gap: '15px' }}>
          <Label htmlFor="useSls">Використовувати SSL:</Label>
          <Checkbox
            type="checkbox"
            id="useSls"
            name="useSls"
            checked={smtpSecure}
            onChange={e => setSmtpSecure(e.target.checked)}
          />
        </FormGroup>
        <BtnWrapper>
          <Btn onClick={onClose}>Скасувати</Btn>
          <Btn onClick={handleSave}>
            {initialSettings ? 'Змінити' : 'Зберегти'}
          </Btn>
        </BtnWrapper>
      </FormWrapper>
      {isLoading ? (
        <div
          style={{
            top: '0',
            width: '100%',
            height: '100%',
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 20,
            background: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <MoonLoader color="#fff" loading={true} css={override} size={100} />
          <h4>{message}</h4>
        </div>
      ) : null}
    </>
  );
};

export default ImapForm;
