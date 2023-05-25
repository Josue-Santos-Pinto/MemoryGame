import styled from "styled-components";

type themeProp = {
  active: boolean;
};

export const Container = styled.div<themeProp>`
  width: 80px;
  height: 30px;
  margin-top: 20px;
  margin-right: 10px;
  margin-bottom: 20px;
  border: 3px solid #101c40;
  background-color: ${(props) =>
    props.active ? "rgba(16,28,64,0.9)" : "transparent"};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media (max-width: 750px) {
    margin-top: 10px;
  }
`;
export const Label = styled.div<themeProp>`
  font-size: 15px;
  color: ${(props) => (props.active ? "#fff" : "#101c40")};
  font-weight: bold;
`;
