import styled from '@emotion/styled';
import { IoArrowRedoCircle, IoArrowUndoCircleSharp } from 'react-icons/io5';

// import { IoArrowUndoCircleSharp, IoArrowRedoCircle } from 'react-icons/io';

export const InputCheck = styled.input`
  display: none;
  &:checked + .MailCheck .IconCheck {
    opacity: 1;
  }
  &:checked + .MailCheck {
    border: none;
  }
`;

export const UpSend = styled(IoArrowUndoCircleSharp)`
  color: ${props => (props.color ? props.color : 'currentColor')};
  width: 25px;
  height: 25px;
`;

export const ReSend = styled(IoArrowRedoCircle)`
  color: ${props => (props.color ? props.color : 'currentColor')};
  width: 25px;
  height: 25px;
`;
export const WrapTitle = styled.div`
  width: 100%;
  height: 100%;
  color: var(--feedback-form-text-input);
`;
export const TitleMail = styled.h3`
  flex: 1;

  overflow: hidden;
  font-family: inherit;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.05em;
  margin-top: 5px;
  margin-bottom: 20px;
`;

export const TitleName = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: bold;
`;

export const TitleAddress = styled.span`
  white-space: nowrap;
  text-align: end;
  font-size: 16px;
  font-style: normal;
  line-height: 10px;
`;
export const TitleDate = styled.span`
  white-space: nowrap;
  text-align: end;
  font-style: normal;
  line-height: 10px;
`;

export const TitleWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const FromWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const Iframe = styled.iframe`
  width: 100%;
  height: 75%;
  border: none;
  html {
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
  }
`;
export const Button = styled.button`
  position: absolute;
  width: 150px;
  background-color: ${props => props.color};
  color: var(--btn-text-color);
  display: flex;
  padding: 10px;
  border: none;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  bottom: 50px;
  right: 80px;
  &:hover {
    box-shadow: 0 0 10px ${props => props.color};
  }
`;
export const ButtonB = styled.button`
  width: 150px;
  position: absolute;
  background-color: ${props => props.color};
  color: var(--btn-text-color);
  display: flex;
  padding: 10px;
  border: none;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  bottom: 50px;
  left: 80px;
  &:hover {
    box-shadow: 0 0 10px ${props => props.color};
  }
`;
