import { FC, useEffect, useRef, useState } from "react";
import { DropdownItem, DropdownMenu, DropdownWrapper } from "./styles";

type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  children: React.ReactNode;
  options: DropdownOption[];
  selectedOption: DropdownOption;
  onSelect: (value: DropdownOption) => void;
};

const Dropdown: FC<DropdownProps> = ({
  children,
  options,
  selectedOption,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: DropdownOption) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <DropdownWrapper ref={dropdownRef}>
      <div onClick={() => setIsOpen((prev) => !prev)}>{children}</div>
      <DropdownMenu isOpen={isOpen}>
        {options.map((option) => (
          <DropdownItem
            onClick={() => handleSelect(option)}
            selected={option.value === selectedOption.value}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownWrapper>
  );
};

export default Dropdown;
