import styled from '@emotion/styled';
import { MdCancel } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
export const Li = styled.li`
  position: relative;
  width: 100%;
  height: 100%;
  color: var(--feedback-form-text-input);
`;
export const WrapTitle = styled.div`
  color: var(--feedback-form-text-input);
`;

export const Form = styled.form`
  width: 100%;
  height: 97%;
  margin: 0 auto;
  padding-top: 20px;
  background-color: var(--main-background-color);

  border-radius: 5px;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
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
  bottom: 0;
  right: 80px;
  &:hover {
    box-shadow: 0 0 10px ${props => props.color};
  }
`;
export const ButtonB = styled(NavLink)`
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
  bottom: 0;
  left: 80px;
  &:hover {
    box-shadow: 0 0 10px ${props => props.color};
  }
`;

export const CancelIcon = styled(MdCancel)`
  width: 26px;
  height: 26px;
`;
