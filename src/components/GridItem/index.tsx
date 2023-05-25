import { GridType } from "../../types/GridItemType";
import * as C from "./styles";
import b7SVG from "../../svgs/b7.svg";
import { easyItems, hardItems } from "../../data/items";

type GridProps = {
  item: GridType;
  onClick: () => void;
};

export function GridItem({ item, onClick }: GridProps) {
  return (
    <C.Container
      showBackground={item.permanentShown || item.shown}
      onClick={onClick}
    >
      {item.permanentShown === false && item.shown === false && (
        <C.Icon src={b7SVG} alt="" opacity={0.1} />
      )}
      {(item.permanentShown || item.shown) && item.item !== null && (
        <C.Icon src={hardItems[item.item].icon} alt="" />
      )}
    </C.Container>
  );
}
