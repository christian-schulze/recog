import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: initial;
  }
`;

interface QueryStringLinkProps {
  to: string;
  children: ReactNode;
}

const QueryStringLink = ({ children, to }: QueryStringLinkProps) => {
  const location = useLocation();

  const navLocation = {
    pathname: to,
    search: location.search,
  };

  return <StyledLink to={navLocation}>{children}</StyledLink>;
};

export { QueryStringLink };
