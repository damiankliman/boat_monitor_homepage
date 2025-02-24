import { FC } from "react";
import { CardContainer } from "./styles";

type CardProps = {
  title?: string;
  extraComponent?: React.ReactNode;
  children?: React.ReactNode;
};

const Card: FC<CardProps> = ({ title, extraComponent, children }) => {
  return (
    <CardContainer>
      {title || extraComponent ? (
        <div>
          {title ? <h3>{title}</h3> : null}
          {extraComponent}
        </div>
      ) : null}
      <div>{children}</div>
    </CardContainer>
  );
};

export default Card;
