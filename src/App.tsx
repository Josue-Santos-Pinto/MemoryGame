import { useEffect, useState } from "react";
import * as C from "./App.styles";
import logoImg from "./assets/devmemory_logo.png";
import RestartIcon from "./svgs/restart.svg";
import { Button } from "./components/Button";
import { InfoItem } from "./components/InfoItem";
import { GridType } from "./types/GridItemType";
import { items } from "./data/items";

export function App() {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridType[]>([]);

  const resetAndCreateGrid = () => {
    // RESETAR

    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);

    // CRIAR GRID VAZIO

    let tmpGrid: GridType[] = [];

    for (let i = 0; i < items.length * 2; i++) {
      tmpGrid.push({
        item: null,
        shown: false,
        permanentShown: false,
      });
    }
    // PREENCHER GRID

    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }

        tmpGrid[pos].item = i;
      }
    }

    setGridItems(tmpGrid);

    //COMEÇAR JOGO

    setPlaying(true);
  };
  useEffect(() => {
    resetAndCreateGrid();
  }, []);

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink>
          <img src={logoImg} width="200" alt="" />
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label="Tempo" value="00:00" />
          <InfoItem label="Movimentos" value="0" />
        </C.InfoArea>
        <Button
          label="Reiniciar"
          icon={RestartIcon}
          onClick={resetAndCreateGrid}
        />
      </C.Info>
      <C.GridArea>
        <C.Grid>..</C.Grid>
      </C.GridArea>
    </C.Container>
  );
}
