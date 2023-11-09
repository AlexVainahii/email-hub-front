import styled from '@emotion/styled';

import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { BsBoxArrowInUp, BsFillBellFill } from 'react-icons/bs';
import { FaCheckSquare, FaTrashRestoreAlt } from 'react-icons/fa';
import { IoIosMailOpen } from 'react-icons/io';
import {
  IoCreate,
  IoMailUnreadSharp,
  IoSendSharp,
  IoTrashSharp,
} from 'react-icons/io5';
import { MdDeleteForever, MdSettingsSuggest } from 'react-icons/md';
import { RiSpamFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

export const ContainerL = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;
export const ContainerWrapperL = styled.div`
  padding: 0 32px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  border-radius: 10px;

  position: relative;
  padding: 0 20px 40px;

  @media screen and (min-width: 768px) {
    padding: 0 32px 40px;
  }

  @media screen and (min-width: 1440px) {
    padding: 0 32px 32px;
  }
`;

export const MailboxWraper = styled.div`
  height: 91%;
  min-width: 100%;
  padding: 10px;
  background: var(--main-background-color);
  gap: 5px;
  border-radius: 10px;
  position: relative;
  display: flex;

  box-sizing: border-box;
  overflow: hidden;
`;

export const CategoriesListWrap = styled.div`
  box-sizing: border-box;
  min-width: 20%;
  height: 100%;

  background: var(--main-background-color);
  border: 1px solid var(--btn-border-color);
  border-radius: 10px;
  position: relative;
  padding: 10px;
  padding-bottom: 13px;
`;
export const CategoriesTitle = styled.h3`
  color: ${props => (props.active ? 'var(--active-btn-color)' : props.color)};
  font-family: inherit;
  font-size: 16px;
  font-weight: 400;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 12px;
  text-overflow: ellipsis;
`;
export const CategoriesList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  font-family: inherit;
  font-size: 14px;
  font-weight: 400;
`;
export const CategoriesItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 20%;
  height: 100%;
  background: var(--main-background-color);
  border: 1px solid ${props => props.color};
  position: relative;
  border-radius: 10px;
  padding: 10px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 400;
  color: ${props => (props.active ? 'var(--active-btn-color)' : props.color)};
  ${props =>
    props.active ? 'background-color: var(--auth-background-color)' : ''};
  &:hover {
    box-shadow: 0 0 10px ${props => props.color};
    background-color: var(--auth-background-color);
    color: var(--active-btn-color);
  }
  &:last-child {
    border: none;
    ${props => (props.ids === 'id' ? 'display:none;' : null)}
    padding: 0;
    margin-top: 20px;
    &:hover {
      box-shadow: 0 0 10px ${props => props.color};
    }
  }
`;
export const SendIcon = styled(IoSendSharp)`
  width: 26px;
  height: 26px;
`;

export const CreateIcon = styled(IoCreate)`
  width: 26px;
  height: 26px;
`;
export const SendButton = styled(NavLink)`
  color: var(--btn-text-color);
  background-color: ${props => props.color};
  justify-content: flex-end;
  right: 10px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const NameBox = styled.span`
  font-size: 18px;
`;

export const UnseenBox = styled.span`
  font-weight: 900;
`;
export const CountWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const MailboxWrap = styled.div`
  height: auto;
  overflow-y: hidden;
  width: 80%;
  height: 100%;
`;
export const Mailbox = styled.ul`
  display: flex;

  flex-direction: column; /* Змінено на вертикальний напрямок для адаптивності */
  padding: 10px;
  background: var(--main-background-color);
  border-radius: 10px;
  border: 1px solid var(--btn-border-color);
  height: ${props => (props.uids === 'true' ? '96%' : '100%')};
  ${props => (props.ids === 'id' ? 'height:100%;' : null)}
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 10px; /* Ширина полоси */
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1; /* Фон доріжки */
  }

  ::-webkit-scrollbar-thumb {
    background: #888; /* Колір полоси */
    border-radius: 5px; /* Закруглені кути полоси */
  }

  /* Горизонтальна полоса прокрутки */
  ::-webkit-scrollbar-horizontal {
    height: 10px; /* Висота полоси */
  }

  ::-webkit-scrollbar-track-piece:start {
    background: #f1f1f1; /* Фон доріжки початку */
  }

  ::-webkit-scrollbar-track-piece:end {
    background: #f1f1f1; /* Фон доріжки кінця */
  }

  ::-webkit-scrollbar-thumb {
    background: #888; /* Колір полоси */
    border-radius: 5px; /* Закруглені кути полоси */
  }
  position: relative;
`;
export const MailItemWrap = styled.li`
  min-height: 40px;
  width: 100%;
  display: flex;
  background: var(--main-background-color);
  border: 1px solid var(--btn-border-color);
  position: relative;
  border-radius: 5px;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    box-shadow: 0 0 10px rgba1(0, 0, 0, 0.2);
    background-color: var(--auth-background-color);
    transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
    .show {
      display: flex;
    }
    .unshow {
      display: none;
    }
  }
`;
export const MailItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: ${props => (props.unseen === 'true' ? '700' : '400')};
  font-size: ${props => (props.unseen === 'true' ? '14px' : '12px')};
  color: var(--title-text-main-color);
  ${props =>
    props.unseen === 'true'
      ? 'text-shadow: 0 0 1px var(--title-text-main-color);'
      : ''};
  gap: 10px;
  height: 100%; /* Замінено height на min-height */
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  padding-left: 35px;
`;

export const MailCheck = styled.label`
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border: 1px solid #000;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-color: var(--accent-color);
  &.panel {
    left: 15px;
  }
`;

export const IconCheck = styled(FaCheckSquare)`
  width: 1.25rem; /* Зміни відповідно до потреб */
  height: 1.25rem; /* Зміни відповідно до потреб */
  color: var(--accent-color);
  opacity: 0;
`;

export const InputCheck = styled.input`
  display: none;
  &:checked + .MailCheck .IconCheck {
    opacity: 1;
  }
  &:checked + .MailCheck {
    border: none;
  }
`;

export const MailFrom = styled.p`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-style: normal;
`;

export const MailTheme = styled.p`
  flex: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-style: normal;
`;

export const MailDate = styled.p`
  width: 20%;
  white-space: nowrap;
  text-align: end;

  font-style: normal;
  line-height: 10px;
`;

export const MailTextWrapper = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TrashRestoreIcon = styled(FaTrashRestoreAlt)`
  color: currentColor;
  width: 22px;
  height: 22px;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  display: ${props =>
    props.path === 'Trash' || props.path === '[Gmail]/Кошик' ? 'blok' : 'none'};
  &:hover {
    color: var(--title-text-main-color);
  }
`;

export const UnSpamIcon = styled(BsBoxArrowInUp)`
  color: currentColor;
  width: 26px;
  height: 26px;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  display: ${props =>
    props.path === 'Junk' || props.path === '[Gmail]/Спам' ? 'block' : 'none'};
  &:hover {
    color: var(--title-text-main-color);
  }
`;

export const TrashIcon = styled(IoTrashSharp)`
  color: currentColor;
  width: 26px;
  height: 26px;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    color: var(--title-text-main-color);
  }
`;

export const SpamIcon = styled(RiSpamFill)`
  color: currentColor;
  width: 26px;
  height: 26px;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  display: ${props =>
    props.path === 'Junk' || props.path === '[Gmail]/Спам' ? 'none' : 'block'};
  &:hover {
    color: var(--title-text-main-color);
  }
`;

export const UnReadIcon = styled(IoMailUnreadSharp)`
  color: currentColor;
  width: 26px;
  height: 26px;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  display: ${props => (props.unseen === 'true' ? 'none' : 'block')};
  &:hover {
    color: var(--title-text-main-color);
  }
`;

export const OpenIcon = styled(IoIosMailOpen)`
  display: ${props => (props.unseen === 'true' ? 'block' : 'none')};
  color: currentColor;
  width: 26px;
  height: 26px;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    color: var(--title-text-main-color);
  }
`;
export const ButtonMailWrap = styled.div`
  display: none;
  position: absolute;
  color: var(--inactive-btn-text-color);
  justify-content: flex-end;
  right: 10px;
  width: 120px;
  height: 100%;
  align-items: center;
  gap: 10px;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
`;
