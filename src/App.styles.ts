import styled from "styled-components";

type themeProp = {
  isDark: boolean;
};

export const Container = styled.div<themeProp>`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => (props.isDark ? "#242526" : "#fff")};
`;
export const MainContent = styled.div`
  width: 100%;
  max-width: 750px;
  margin: auto;
  display: flex;
  padding: 50px 0;

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;
export const SwitchArea = styled.div`
  max-width: 150px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 60px;
  top: 10px;

  @media (max-width: 980px) {
    right: 10px;
  }
`;
export const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;

  @media (max-width: 750px) {
    margin-bottom: 50px;
    align-items: center;
  }
`;
export const LogoLink = styled.a`
  display: block;
`;
export const InfoArea = styled.div`
  width: 100%;
  margin: 10px 0;

  @media (max-width: 750px) {
    display: flex;
    justify-content: space-around;
    text-align: center;
  }
`;

export const GridArea = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;

  @media (max-width: 750px) {
    justify-content: center;
    margin: 0 20px;
  }
`;

export const Grid = styled.div`
  width: 430px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  @media (max-width: 750px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
