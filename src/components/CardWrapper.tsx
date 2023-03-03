import React from 'react';
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row wrap;
  max-width: 800px;
  margin-top: 3rem;
`;

const Card = styled.div`
  padding: 1.5rem;
  color: inherit;
  text-decoration: none;
  border: 1px solid black;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  width: 100%;

  &:hover,
  :focus,
  :active {
    color: #0070f3;
    border-color: #0070f3;
  }
`;

export default function CardWrapper(): JSX.Element {
  return (
    <FlexContainer>
      <Card>lollll</Card>
    </FlexContainer>
  );
}
