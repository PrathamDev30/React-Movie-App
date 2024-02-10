import React from "react";
import PropTypes from "prop-types";
// Image
import searchIcon from "../../images/search-icon.svg";
// Styles
import { Wrapper, Content } from "./SearchBar.styles";
import { useState, useEffect, useRef } from "react";

const SearchBar = ({ setsearchTerm }) => {
  const [state, setstate] = useState("");
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    const timer = setTimeout(() => {
      setsearchTerm(state);
    }, 500);
    return () => clearTimeout(timer);
  }, [setsearchTerm, state]);

  return (
    <Wrapper>
      <Content>
        <img src={searchIcon} alt="search-icon" />
        <input
          type="text"
          placeholder="Search Movie"
          onChange={(event) => setstate(event.currentTarget.value)}
          value={state}
        />
      </Content>
    </Wrapper>
  );
};
export default SearchBar;
