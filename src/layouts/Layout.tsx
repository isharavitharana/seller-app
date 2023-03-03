import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import PrimaryAppBar from '../components/PrimaryAppBar';

interface props {
  children: React.ReactNode;
  title: string;
  description: string;
}
const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`;

const Header = styled.header`
  width: 100%;
`;

const Main = styled.main`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Layout({
  children,
  title,
  description,
}: props): JSX.Element {
  return (
    <Container>
      <Head>
        <title id='title'>{title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='description' content={description} />
      </Head>
      <Header>
        <PrimaryAppBar />
      </Header>
      <Main>{children}</Main>
    </Container>
  );
}
