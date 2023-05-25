import styled from "styled-components";
import { ThemeType } from "../../types/ThemeType";

export const Container = styled.div`
  margin: 20px 0;
`;

export const Label = styled.div<ThemeType>`
  font-size: 15px;
  color: ${(props) => props.theme.textColors.secondary};
`;

export const Value = styled.div<ThemeType>`
  font-size: 37px;
  font-weight: bold;
  color: ${(props) => props.theme.textColors.primary}};
`;
