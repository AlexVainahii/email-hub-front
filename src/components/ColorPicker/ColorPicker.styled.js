import styled from '@emotion/styled';

export const SelectContainer = styled.div`
  position: relative;
  width: 60%;
`;
export const Span = styled.span`
  position: absolute;
  right: 10px;
`;
export const StyledSelect = styled.div`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
`;

export const OptionsContainer = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  width: 100%;

  z-index: 1;
  top: 100%;
  left: 0;
  background: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  scroll: auto;
  overflow: hidden;
`;

export const Option = styled.div`
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
  &:hover {
    background: #f2f2f2;
  }
`;
export const OptionBox = styled.div`
  position: absolute;
  z-index: 2;
  width: 260px;
  height: 90px;
  background: var(--main-background-color);
  box-shadow: 2px 2px 16px 0px rgba(136, 165, 191, 0.48);
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
`;
