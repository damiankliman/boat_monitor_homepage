import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border: 1px solid var(--color-outline);
  border-radius: var(--border-radius-standard);

  > div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }

  > div:last-child {
    width: 100%;
  }
`;
