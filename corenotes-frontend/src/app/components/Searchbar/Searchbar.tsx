import React, { ChangeEvent, useState, MouseEvent } from "react";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPalette, faStar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setShowNonFavorited, setShowFavorited, setColorFilter, selectSearch, setSearch } from "@/app/store/features/generalStateSlice";
import ColorPicker from "../ColorPicker/ColorPicker";
import { Colors } from "@/app/enums/colors";
import { FavoritedPicker } from "./FavoritedPicker";

export default function Searchbar() {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFavoritedFilter, setShowFavoritedFilter] = useState(false);

  const search = useSelector(selectSearch);
  const dispatch = useDispatch();

  function onSearchChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setSearch(e.target.value));
  }

  function onFavoritedFilterToggle(event: MouseEvent<SVGSVGElement>) {
    setShowColorPicker(false);
    setShowFavoritedFilter((current) => !current);
  }

  function onColorPickerToggle(event: MouseEvent<SVGSVGElement>) {
    setShowFavoritedFilter(false);
    setShowColorPicker((current) => !current);
  }

  function changeColorFilter(color: Colors) {
    dispatch(setColorFilter(color));
    setShowColorPicker(false);
  }

  function onFavoritesOptionSelected(option: string) {
    setShowFavoritedFilter(false);

    switch (option) {
      case "favoritas":
        dispatch(setShowFavorited(true));
        dispatch(setShowNonFavorited(false));
        break;
      case "outras":
        dispatch(setShowFavorited(false));
        dispatch(setShowNonFavorited(true));
        break;
      case "todas":
        dispatch(setShowFavorited(true));
        dispatch(setShowNonFavorited(true));
        break;
      default:
    }
  }

  function clearColorFilter() {
    dispatch(setColorFilter(null));
    setShowColorPicker(false);
  }

  return (
    <form className={styles.container}>
      <div className={styles.input_field}>
        <input type="text" placeholder="Pesquisar notas" value={search} onChange={onSearchChange} />
      </div>
      <div className={styles.icons_container}>
        <div>
          <>
            <FontAwesomeIcon icon={faStar} className={styles.icon} onClick={onFavoritedFilterToggle} />
            {showFavoritedFilter && <FavoritedPicker selectOption={onFavoritesOptionSelected} />}
          </>
          <>
            <FontAwesomeIcon icon={faPalette} className={styles.icon} onClick={onColorPickerToggle} />
            {showColorPicker && <ColorPicker changeColor={changeColorFilter} isVertical={true} hasClearColorOption={true} clearColor={clearColorFilter} />}
          </>
        </div>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.magnifying_glass} />
      </div>
    </form>
  );
}
