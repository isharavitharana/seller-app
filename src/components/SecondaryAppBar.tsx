import React from 'react';
import styled from 'styled-components';
import { Home } from '@styled-icons/fluentui-system-filled';
import { HeartFill } from '@styled-icons/bootstrap';
import { useRouter } from 'next/router';

const PrimaryNav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  z-index: 15;
  height: 50px;
  position: fixed;
  left: 0;
  bottom: 0;
  @media (min-width: 600px) {
    display: none;
  }
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
  justify-content: center;
  //   margin-right: 30px;
  cursor: pointer;
  width: 100%;
`;

const Divider = styled.span`
  border-left: 1px solid #ffffff;
  height: 40px;
`;

export default function SecondaryAppBar() {
  const router = useRouter();
  return (
    <PrimaryNav>
      <NavButton onClick={() => router.push('/')}>
        <HomeIcon size='35' />
      </NavButton>
      <Divider />
      <NavButton onClick={() => router.push('/my-products')}>
        <HeartIcon size='30' />
      </NavButton>
    </PrimaryNav>
  );
}
