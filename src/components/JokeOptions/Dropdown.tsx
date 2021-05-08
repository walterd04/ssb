import React, { useCallback, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import OutsideClickHandler from "react-outside-click-handler";

import caretDown from "../../assets/caret.svg";

type DropdownOption = { label: string; value: string };

interface DropdownProps {
  id: string;
  onClick?: () => void;
  onChangeEventHandler: (e: DropdownOption) => void;
  items: DropdownOption[];
  placeholder: string;
}

const HiddenItem = styled.div`
  display: none;
`;

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: #ffffff;
  border: 1px solid #000000;
  box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.25);
`;

const DropdownSelect = styled.div`
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 12px;
`;

const StyledDropdown = styled.div`
  display: block;
  position: relative;
  width: 90%;
  margin: 0 auto;
`;
const DropdownPlaceholder = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

const DropdownItem = styled.button`
  display: block;
  position: relative;
  padding: 12px 0;
  width: 100%;
  appearance: none;
  text-align: left;
`;

type CaretProps = { isActive: boolean };

const Caret = styled.img<CaretProps>`
  width: 10px;
  height: 10px;
  margin-left: auto;
  transform: ${(props) => (props.isActive ? "rotate(180deg)" : "")};
`;

export const Dropdown: React.FC<DropdownProps> = ({
  id,
  items,
  placeholder,
  onClick,
  onChangeEventHandler,
}: DropdownProps) => {
  const [active, setActive] = useState<boolean>(false);
  const [selectPlaceholder, setSelectPlaceholder] = useState<string>(
    placeholder
  );
  const [activeValue, setActiveValue] = useState<string | undefined>(undefined);

  const UIDropdown = useRef<HTMLDivElement | null>(null);

  const handleClick = useCallback((): void => {
    setActive(!active);
    if (onClick) {
      onClick();
    }
  }, [onClick, setActive, active]);

  useEffect(() => {
    const renderedDropdown: HTMLDivElement | null = UIDropdown.current;
    if (renderedDropdown)
      renderedDropdown.addEventListener("keypress", () => {
        handleClick();
      });
    return () => {
      if (!renderedDropdown) {
        return;
      }
      renderedDropdown.removeEventListener("keypress", handleClick, true);
    };
  }, [active, setActive, onClick, handleClick]);

  const handleOptionClick = (item: DropdownOption): void => {
    setActive(false);
    setSelectPlaceholder(item.label);
    setActiveValue(item.value);
    if (onChangeEventHandler) onChangeEventHandler(item);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setActive(false)}>
      <HiddenItem>
        <select
          data-testid="hidden-select"
          id={id}
          name={id}
          onChange={(e: unknown) => console.log(e)}
          value={activeValue}
        >
          {items.map((item: DropdownOption) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </HiddenItem>
      <DropdownContainer>
        <DropdownSelect
          data-testid="visual-select"
          ref={UIDropdown}
          onClick={handleClick}
          tabIndex={0}
          title={selectPlaceholder}
        >
          <DropdownPlaceholder>
            {selectPlaceholder}
            <Caret isActive={active} src={caretDown} alt="arrow down" />
          </DropdownPlaceholder>
        </DropdownSelect>
        {active && (
          <StyledDropdown data-testid="visual-dropdown">
            {items.map((item: { value: string; label: string }) => (
              <DropdownItem
                onClick={() => handleOptionClick(item)}
                key={item.value}
                data-testid={item.value}
              >
                {item.label}
              </DropdownItem>
            ))}
          </StyledDropdown>
        )}
      </DropdownContainer>
    </OutsideClickHandler>
  );
};
