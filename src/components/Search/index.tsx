import { IoSearchOutline } from 'react-icons/io5';
import { Container, Content, InputBase, Filter } from './styles';
import { InputHTMLAttributes, useState } from 'react';
import { FilterModal } from '../FilterModal';

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch: (e: any) => void;
  onOpenRequest: () => void;
}

export function Search({
  onSearch,
  value,
  onOpenRequest,
  ...rest
}: SearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container>
      <Content>
        <IoSearchOutline size={36} />
        <InputBase onChange={onSearch} {...rest} value={value} />
      </Content>
      <Filter src="/assets/filter.svg" onClick={onOpenRequest} />
    </Container>
  );
}
