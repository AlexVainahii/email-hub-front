import styled from '@emotion/styled';
import { BsBoxArrowInUp } from 'react-icons/bs';
import { FaTrashRestoreAlt } from 'react-icons/fa';
import { IoIosMailOpen } from 'react-icons/io';
import {
  IoArrowBackCircle,
  IoCaretBackSharp,
  IoCaretForwardSharp,
  IoMailUnreadSharp,
  IoReloadCircleSharp,
  IoSearch,
  IoTrashSharp,
} from 'react-icons/io5';
import { MdAddTask, MdCancel } from 'react-icons/md';
import { RiSpamFill } from 'react-icons/ri';

export const PanelContainer = styled.div`
  color: var(--title-text-main-color);
  background: var(--main-background-color);
  width: 100%;
  height: 39px;
  padding: 3px;
  margin-bottom: 3px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;
export const BackIcon = styled(IoCaretBackSharp)`
  color: currentColor;
  width: 20px;
  height: 20px;
  opacity: ${props => (props.page === 'true' ? '1.0' : '0.5')};
`;
export const ForvardIcon = styled(IoCaretForwardSharp)`
  color: currentColor;
  width: 20px;
  height: 20px;
  opacity: ${props => (props.page === 'true' ? '0.5' : '1')};
`;

export const TotalCount = styled.span`
  color: currentColor;
  font-family: inherit;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.33;
`;
export const FormSearch = styled.form`
  position: absolute;
  display: flex;
  left: 56%;
  align-items: center;
  justify-content: start;
  gap: 10px;
  width: 200px;
  height: 100%;
`;
export const SearchInput = styled.input`
  position: absolute;
  background-color: var(--main-background-color);
  border-color: var(--btn-border-color);
  color: currentColor;
  font-family: inherit;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.33;
  outline: none;
  height: 30px;
  padding-left: 5px;
  &.inactive-input {
    width: 30px;
    height: 30px;
    left: 0;
    border-radius: 50%;
    transition: all 0.3s ease-in-out;
    padding-right: 0;
  }
  &.active-input {
    padding-right: 50px;
    background-color: var(--auth-background-color);
    width: 400px;
    left: -100px;
    transition: all 0.3s ease-in-out;
    border-radius: 10px;
  }
`;

export const BackLinkIcon = styled(IoArrowBackCircle)`
  width: 30px;
  height: 30px;
  ${props => (props.uid ? 'display:block' : 'display:none')}
`;
export const CancelIcon = styled(MdCancel)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: currentColor;
  width: 20px;
  height: 20px;
  z-index: 1;
  &.inactive-icon {
    left: 5px;
    opacity: 0;
    transition: all 0.3s ease-in-out;
  }
  &.active-icon {
    left: 275px;
    opacity: 1;
    transition: all 0.3s ease-in-out;
  }
`;

export const SearchIcon = styled(IoSearch)`
  position: absolute;
  top: 50%;

  transform: translateY(-9px);
  color: currentColor;
  width: 20px;
  height: 20px;
  z-index: 2;

  &.inactive-icon {
    left: 5px;
    transition: all 0.3s ease-in-out;
  }
  &.active-icon {
    left: 250px;
    transition: all 0.3s ease-in-out;
  }
`;
export const ButtonWrap = styled.div`
  position: relative;
  padding-left: ${props => (props.prv === 'false' ? '50px' : '5px')};
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
`;

export const LoadIcon = styled(IoReloadCircleSharp)`
  color: currentColor;
  width: 28px;
  height: 28px;
`;
export const TrashIcon = styled(IoTrashSharp)`
  display: ${props => (props.chekout === 0 ? 'none' : 'block')};
  color: currentColor;
  width: 24px;
  height: 24px;
`;
export const TrashRestoreIcon = styled(FaTrashRestoreAlt)`
  display: ${props => (props.chekout === 0 ? 'none' : 'block')};
  color: currentColor;
  width: 24px;
  height: 24px;
`;
export const UnReadIcon = styled(IoMailUnreadSharp)`
  display: ${props => (props.chekout === 0 ? 'none' : 'block')};
  color: currentColor;
  width: 26px;
  height: 26px;
`;
export const OpenIcon = styled(IoIosMailOpen)`
  display: ${props => (props.chekout === 0 ? 'none' : 'block')};
  color: currentColor;
  width: 26px;
  height: 26px;
`;
export const TaskIcon = styled(MdAddTask)`
  color: currentColor;
  width: 24px;
  height: 24px;
`;
export const SpamIcon = styled(RiSpamFill)`
  display: ${props => (props.chekout === 0 ? 'none' : 'block')};
  color: currentColor;
  width: 26px;
  height: 26px;
`;
export const UnSpamIcon = styled(BsBoxArrowInUp)`
  display: ${props => (props.chekout === 0 ? 'none' : 'block')};
  color: currentColor;
  width: 24px;
  height: 24px;
`;
export const PageControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 15px;
`;
