import React, { useEffect, useRef, useState } from 'react';
import {
  Option,
  OptionsContainer,
  SelectContainer,
  Span,
  StyledSelect,
} from './CustomSelect.styled';

const CustomSelect = ({ options, selectedValue, onChange, color }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = value => {
    onChange(value);
    toggleDropdown();
  };
  const handleClickOutside = event => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    // Додаємо обробник кліку для документа при відкритті списку
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    // При зміні isOpen відписуємося від обробника кліку
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);
  return (
    <SelectContainer ref={selectRef}>
      <StyledSelect color={color} onClick={toggleDropdown}>
        {options.find(option => option.value === selectedValue)?.icon}
        {options.find(option => option.value === selectedValue)?.label}
        <Span className={`arrow ${isOpen ? 'open' : ''}`}>&#9660;</Span>
      </StyledSelect>
      <OptionsContainer isOpen={isOpen}>
        {options.map(option => (
          <Option
            color={color}
            key={option.value}
            onClick={() => handleOptionClick(option.value)}
          >
            {option.icon} {option.label}
          </Option>
        ))}
      </OptionsContainer>
    </SelectContainer>
  );
};

export default CustomSelect;
