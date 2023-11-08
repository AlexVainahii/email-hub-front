import styled from '@emotion/styled';
import {
  SiGoogle,
  SiYahoo,
  SiMicrosoftoutlook,
  SiApple,
  SiProtonmail,
  SiZoho,
  SiMailgun,
} from 'react-icons/si';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { BsFillBellFill } from 'react-icons/bs';
import { MdDeleteForever, MdSettingsSuggest } from 'react-icons/md';

export const ContainerL = styled.div`
  height: 100%;
  min-width: 100%;
  position: relative;
`;
export const ContainerWrapperL = styled.div`
  padding: 0 32px;
  height: 100%;
  min-width: 100%;
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
export const Container = styled.div`
  height: 120px;
  width: 100%;
  background: var(--main-background-color);
  border-radius: 10px;
  border: 1px solid var(--btn-border-color);
  position: relative;
`;

export const BoxList = styled.ul`
  display: flex;
  gap: 15px;
  padding: 20px;
  height: 100%;
`;
export const SettingButton = styled(MdSettingsSuggest)`
  position: absolute;
  right: 25px;
  top: 1px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: currentColor;
  opacity: 0;
  transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
`;
export const DeleteButton = styled(MdDeleteForever)`
  position: absolute;
  right: 0;
  top: 0px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: currentColor;
  transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
`;
export const WrapBoxCard = styled.li`
  color: ${props => props.color};
  width: 177px;
  height: 100%;
  ${props => (props.border ? 'opacity:1;' : 'opacity:0.6;')}
  border: 3px solid ${props =>
    props.border ? props.color : 'var(--btn-border-color)'};
  border-radius: 10px;
  position: relative;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:last-child {
    width: 77px;
  }
  &:hover {
    border: 3px solid
      ${props => (props.color ? props.color : 'var(--btn-border-color)')};
    box-shadow: 0 0 10px ${props => props.color};
    opacity: 1;
    .show {
      opacity: 0.7;
      &:hover {
        opacity: 1;
      }
    }
  }
`;
export const BoxCard = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 5px;
`;

export const ButtonCard = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  cursor: pointer;
`;
export const AddBox = styled(AiOutlineAppstoreAdd)`
  width: 100%;
  height: 100%;
  color: var(--feedback-form-text);
`;

export const IconBox = styled.div`
  width: 100%;
  height: 100%;
  color: var(--feedback-form-text);
`;
export const SiYahooI = styled(SiYahoo)`
  width: 60%;
  height: 60%;
`;
export const SiGoogleI = styled(SiGoogle)`
  width: 60%;
  height: 60%;
`;
export const SiMicrosoftoutlookI = styled(SiMicrosoftoutlook)`
  width: 60%;
  height: 60%;
`;
export const SiAppleI = styled(SiApple)`
  width: 60%;
  height: 60%;
`;
export const SiProtonmailI = styled(SiProtonmail)`
  width: 60%;
  height: 60%;
`;
export const SiZohoI = styled(SiZoho)`
  width: 60%;
  height: 60%;
`;
export const SiMailgunI = styled(SiMailgun)`
  width: 60%;
  height: 60%;
`;

export const ShowP = styled.p`
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  color: currentColor;
  margin: 0 auto;
`;
export const ShowSpan = styled(BsFillBellFill)`
  position: absolute;
  left: 1px;
  top: 12px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;

  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  border-bottom-left-radius: 10%;
  border-bottom-right-radius: 10%;
`;
export const ButtonSlideLeft = styled.button`
  position: absolute;
  left: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  border-radius: 50%;
`;
export const ButtonSlideRight = styled.button`
  position: absolute;
  right: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  border-radius: 50%;
`;
