import React from 'react';
import styled from 'styled-components';
import { Home } from '@styled-icons/fluentui-system-filled';
import { HeartFill } from '@styled-icons/bootstrap';

const PrimaryNav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  z-index: 14;
  height: 50px;
  padding: 0 30px;
`;

const HomeIcon = styled(Home)`
  color: #ffffff;
`;
const HeartIcon = styled(HeartFill)`
  color: #ffffff;
`;
const NavButton = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 30px;
  cursor: pointer;
`;
const NavButtonHeading = styled.h3`
  color: #ffffff;
  margin-left: 10px;
`;

export default function PrimaryAppBar(): JSX.Element {
  return (
    <PrimaryNav>
      <NavButton>
        <HomeIcon size='35' /> <NavButtonHeading>Home</NavButtonHeading>
      </NavButton>
      <NavButton>
        <HeartIcon size='30' /> <NavButtonHeading>Liked</NavButtonHeading>
      </NavButton>
    </PrimaryNav>
  );
}
