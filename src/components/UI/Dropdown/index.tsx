import { useEffect, useRef, useState } from "react";
import { DropdownItem, DropdownMenu, DropdownWrapper } from "./styles";

type DropdownOption<T> = {
  label: string;
  value: T;
};

type DropdownProps<T> = {
  children: React.ReactNode;
  options: DropdownOption<T>[];
  selectedOption: T;
  onSelect: (value: T) => void;
};

const Dropdown = <T,>({
  children,
  options,
  selectedOption,
  onSelect,
}: DropdownProps<T>) => {
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

  const handleSelect = (option: DropdownOption<T>) => {
    onSelect(option.value);
    setIsOpen(false);
  };

  return (
    <DropdownWrapper ref={dropdownRef}>
      <div onClick={() => setIsOpen((prev) => !prev)}>{children}</div>
      <DropdownMenu isOpen={isOpen}>
        {options.map((option) => (
          <DropdownItem
            onClick={() => handleSelect(option)}
            selected={option.value === selectedOption}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownWrapper>
  );
};

export default Dropdown;
