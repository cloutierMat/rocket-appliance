import React, { useContext } from "react";
import { Animated } from "react-animated-css";
import GameContext from "../context/GameContext";
import styles from "../app.module.css";

export default function SearchBar() {
  const gameCtx = useContext(GameContext);

  function handleSearch(event) {
    const fragment = event.target.value.toLowerCase();
    gameCtx.setFragmentForFilter(fragment);
  }

  return (
    <div className={styles["search-box-wrapper"]}>
      <div className={styles["text-default"]}>
        <Animated animationOut="fadeOut" isVisible={true}>
          Enter queries to filter available games
        </Animated>
      </div>
      <div>
        <input
          type="search"
          autoComplete="off"
          placeholder="Search Input"
          name="q"
          onChange={handleSearch}
          className={styles["search-box"]}
        />
      </div>
    </div>
  );
}
