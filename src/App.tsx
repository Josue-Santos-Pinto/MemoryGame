import { useEffect, useState, useContext } from "react";
import * as C from "./App.styles";
import logoImg from "./assets/devmemory_logo.png";
import logoDarkImg from "./assets/devmemory_logo_dark.png";
import RestartIcon from "./svgs/restart.svg";
import { Button } from "./components/Button";
import { InfoItem } from "./components/InfoItem";
import { GridType } from "./types/GridItemType";
import { easyItems, hardItems, mediumItems } from "./data/items";
import { GridItem } from "./components/GridItem";
import { formatTimeElapse } from "./helpers/formatTimeElapse";
import Switch from "react-switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { GameSettings } from "./components/GameSettings";
import { Context } from "./contexts/Context";
import * as themes from "./themes";

export function App() {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridType[]>([]);
  const [items, setItems] = useState(mediumItems);

  const [currentDifficulty, setCurrentDifficulty] = useState(1);

  const { state, dispatch } = useContext(Context);

  const difficulties = [
    { id: 1, name: "Facil" },
    { id: 2, name: "Medio" },
    { id: 3, name: "Dificil" },
  ];

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

  const handleSwitchTheme = () => {
    if (state.theme.theme === themes.light) {
      dispatch({
        type: "SWITCH_THEME",
        payload: { theme: themes.dark },
      });
    } else {
      dispatch({
        type: "SWITCH_THEME",
        payload: { theme: themes.light },
      });
    }
  };

  useEffect(() => {
    resetAndCreateGrid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

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

  useEffect(() => {
    switch (currentDifficulty) {
      case 1:
        setItems(easyItems);
        break;
      case 2:
        setItems(mediumItems);
        break;
      case 3:
        setItems(hardItems);
        break;
    }
  }, [currentDifficulty]);

  console.log(items);

  return (
    <C.Container theme={state.theme.theme}>
      <C.MainContent>
        <C.SwitchArea>
          {state.theme.theme === themes.dark ? (
            <FontAwesomeIcon
              icon={faMoon}
              size={"lg"}
              style={{ marginRight: 10 }}
              color="#DDD"
            />
          ) : (
            <FontAwesomeIcon
              icon={faSun}
              size={"lg"}
              style={{ marginRight: 10 }}
              color="#222"
            />
          )}

          <Switch
            onChange={handleSwitchTheme}
            checked={state.theme.theme === themes.dark}
            onColor="#DDD"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
          />
        </C.SwitchArea>
        <C.Info>
          {state.theme.theme === themes.dark ? (
            <C.LogoLink>
              <img src={logoDarkImg} width="200" alt="" />
            </C.LogoLink>
          ) : (
            <C.LogoLink>
              <img src={logoImg} width="200" alt="" />
            </C.LogoLink>
          )}

          <C.InfoArea>
            <InfoItem label="Tempo" value={formatTimeElapse(timeElapsed)} />
            <InfoItem label="Movimentos" value={moveCount.toString()} />
            <C.GameSettingsArea>
              <div
                style={{
                  fontSize: 15,
                  color: state.theme.theme.textColors.secondary,
                }}
              >
                Dificuldade
              </div>
              <C.DifficultyArea>
                {difficulties.map((item) => (
                  <GameSettings
                    key={item.id}
                    onClick={() => setCurrentDifficulty(item.id)}
                    data={item}
                    active={item.id === currentDifficulty}
                  />
                ))}
              </C.DifficultyArea>
            </C.GameSettingsArea>
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
      </C.MainContent>
    </C.Container>
  );
}
