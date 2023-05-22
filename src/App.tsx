import * as C from "./App.styles";
import logoImg from "./assets/devmemory_logo.png";

export function App() {
  return (
    <C.Container>
      <C.Info>
        <C.LogoLink>
          <img src={logoImg} width="200" alt="" />
        </C.LogoLink>

        <C.InfoArea>...</C.InfoArea>
        <button>Reiniciar</button>
      </C.Info>
      <C.GridArea></C.GridArea>
    </C.Container>
  );
}
