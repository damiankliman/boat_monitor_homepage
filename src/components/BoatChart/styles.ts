import styled from "styled-components";

export const TooltipContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px 12px;
  background-color: var(--color-background);
  border: 1px solid var(--color-outline);
  border-radius: var(--border-radius-standard);
`;

export const ChartLoaderContainer = styled.div<{
  $height: number;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ $height }) => $height}px;

  > svg {
    font-size: 2em;
  }
`;
