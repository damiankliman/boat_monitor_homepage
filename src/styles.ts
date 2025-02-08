import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--color-border);

  > h1 {
    text-align: center;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px;
  width: auto;
  max-width: 800px;
  margin: 0 auto;
`;

export const ChartsHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const ChartsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;
