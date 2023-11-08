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
import { IoMdHelpCircle } from 'react-icons/io';
export const IoMdHelpCircleI = styled(IoMdHelpCircle)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transform: scale(1.1);
    color: var(--accent);
  }
`;
export const SiYahooI = styled(SiYahoo)`
  width: 20px;
  height: 20px;
`;
export const SiGoogleI = styled(SiGoogle)`
  width: 20px;
  height: 20px;
`;
export const SiMicrosoftoutlookI = styled(SiMicrosoftoutlook)`
  width: 20px;
  height: 20px;
`;
export const SiAppleI = styled(SiApple)`
  width: 20px;
  height: 20px;
`;
export const SiProtonmailI = styled(SiProtonmail)`
  width: 20px;
  height: 20px;
`;
export const SiZohoI = styled(SiZoho)`
  width: 20px;
  height: 20px;
`;
export const SiMailgunI = styled(SiMailgun)`
  width: 20px;
  height: 20px;
`;

export const FormWrapper = styled.div`
  width: 450px;
  margin: 0 auto;
`;

export const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-family: inherit;
  font-weight: 600;
  line-height: 1.33;
  text-align: center;
  color: var(--title-text-main-color);
`;

export const FormGroup = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FormGroupI = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
`;
export const Label = styled.label`
  width: 180px;
  font-size: 1rem;
  color: var(--title-text-main-color);
`;

export const Input = styled.input`
  width: 60%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
`;

export const InputColor = styled.input`
  width: 10%;

  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

export const SelectIcon = styled.select`
  width: 60%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

export const BtnWrapper = styled.div`
  margin-top: 18px;
  display: flex;
  justify-content: space-around;
`;

export const Btn = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-family: inherit;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.33;
  cursor: pointer;
  background-color: var(--accent-background-color);
  color: var(--btn-text-color);
  transition: background-color 0.3s;
  :hover {
    background: var(--active-btn-color);
    box-shadow: 4px 2px 16px 0px rgba(136, 165, 191, 0.48);
  }

  @media screen and (min-width: 375px) {
    margin-right: 18px;
  }

  @media screen and (min-width: 768px) {
    padding: 12px 32px;
    font-size: 14px;
    line-height: 1.28;
    margin-right: 24px;
  }
`;
export const Checkbox = styled.input`
  accent-color: var(--accent-background-color);
  margin-right: 8px;
  width: 20px;
  height: 20px;
`;
