import styled from "styled-components";

type themeProp = {
  isDark: boolean;
};

export const Container = styled.div`
  margin: 20px 0;
`;

export const Label = styled.div<themeProp>`
  font-size: 15px;
  color: ${(props) => (props.isDark ? "#ccc" : "#6a7d8b;")};
`;

export const Value = styled.div<themeProp>`
  font-size: 37px;
  font-weight: bold;
  color: ${(props) => (props.isDark ? "#fff" : "#101c40;")};
`;
