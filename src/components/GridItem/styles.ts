import styled from "styled-components";

type ContainerProps = {
  showBackground: boolean;
};

type IconProps = {
  opacity?: number;
};

export const Container = styled.div<ContainerProps>`
  background-color: ${(props) =>
    props.showBackground ? "#1550ff" : "#e2e3e3"};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-width: 90px;
  min-height: 90px;
`;

export const Icon = styled.img<IconProps>`
  width: 40px;
  height: 40px;
  opacity: ${(props) => props.opacity ?? 1};
`;
