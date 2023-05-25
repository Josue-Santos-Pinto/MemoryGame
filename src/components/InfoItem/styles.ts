import styled from "styled-components";
import { themeType } from "../../reducers/themeReducer";

export const Container = styled.div`
  margin: 20px 0;
`;

export const Label = styled.div<themeType>`
  font-size: 15px;
  color: ${(props) => props.theme.secondary};
`;

export const Value = styled.div<themeType>`
  font-size: 37px;
  font-weight: bold;
  color: ${(props) => props.theme.secondary}};
`;
