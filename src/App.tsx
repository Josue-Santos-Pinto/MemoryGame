import { useEffect, useState } from "react";
import * as C from "./App.styles";
import logoImg from "./assets/devmemory_logo.png";
import RestartIcon from "./svgs/restart.svg";
import { Button } from "./components/Button";
import { InfoItem } from "./components/InfoItem";
import { GridType } from "./types/GridItemType";
import { items } from "./data/items";
import { GridItem } from "./components/GridItem";
import { formatTimeElapse } from "./helpers/formatTimeElapse";

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

  const handleItemClick = (index: number) => {
    if (playing && index !== null && shownCount < 2) {
      let tmpGrid = [...gridItems];
      if (
        tmpGrid[index].permanentShown === false &&
        tmpGrid[index].shown === false
      ) {
        tmpGrid[index].shown = true;
        setShownCount(shownCount + 1);
      }
      setGridItems(tmpGrid);
    }
  };

  useEffect(() => {
    resetAndCreateGrid();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) {
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  // VERIFICAR SE OS CARDS SÃO IGUAIS

  useEffect(() => {
    if (shownCount === 2) {
      let opened = gridItems.filter((item) => item.shown === true);
      if (opened.length === 2) {
        if (opened[0].item === opened[1].item) {
          let tmpGrid = [...gridItems];
          for (let i in tmpGrid) {
            if (tmpGrid[i].shown === true) {
              tmpGrid[i].permanentShown = true;
              tmpGrid[i].shown = false;
            }
          }
          setGridItems(tmpGrid);
          setShownCount(0);
        } else {
          setTimeout(() => {
            let tmpGrid = [...gridItems];
            for (let i in tmpGrid) {
              tmpGrid[i].shown = false;
            }
            setGridItems(tmpGrid);
            setShownCount(0);
          }, 1000);
        }
        setMoveCount((moveCount) => moveCount + 1);
      }
    }
  }, [shownCount, gridItems]);

  useEffect(() => {
    if (
      moveCount > 0 &&
      gridItems.every((item) => item.permanentShown === true)
    ) {
      setPlaying(false);
    }
  }, [moveCount, gridItems]);

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink>
          <img src={logoImg} width="200" alt="" />
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label="Tempo" value={formatTimeElapse(timeElapsed)} />
          <InfoItem label="Movimentos" value={moveCount.toString()} />
        </C.InfoArea>
        <Button
          label="Reiniciar"
          icon={RestartIcon}
          onClick={resetAndCreateGrid}
        />
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
}
