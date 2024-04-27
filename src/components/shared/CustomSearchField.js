import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import queryString from "query-string";
import { useEffect, useMemo, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import propTypes from "prop-types";

const Search = styled("div")(({ theme }) => ({
  width: "250px",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette?.commonColor?.white,
  border: `1px solid ${theme.palette?.primary?.main}`,
  marginRight: theme.spacing(2),
  marginLeft: 0,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledCancelIcon = styled(CancelIcon)({
  height: "20px",
  width: "20px",
});

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  boxSizing: "border-box",
  paddingRight: "12px",
  fontSize: "0.875rem",
  ".MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
  },
}));

export const CustomSearchField = ({ placeholder }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const pageParams = queryString.parse(location?.search);
  const search = location.search;
  const searchParam = useMemo(() => new URLSearchParams(search), [search]);
  const searchData = searchParam?.get("search");
  const [value, setValue] = useState("");

  const clearSearch = () => {
    const data = { ...pageParams };
    delete data?.search;
    setValue("");
    navigate(
      {
        pathName: `${pathName}`,
        search: `?${createSearchParams({ ...data })}`,
      },
      { state: location.state || null }
    );
  };

  const onSearchChange = (e) => {
    if (e?.key === "Enter" || e?.keyCode === 13) {
      navigate(
        {
          pathName: `${pathName}`,
          search: `?${createSearchParams({
            ...pageParams,
            search: e.target.value.trim(),
            currentPage: 1,
          })}`,
        },
        { state: location.state || null }
      );
    }
  };

  const onChange = (e) => {
    if (e?.target?.value?.trim() === "") {
      navigate(
        {
          pathName: `${pathName}`,
          search: `?${createSearchParams({
            ...pageParams,
            search: e.target.value.replace(/\s+/g, " "),
          })}`,
        },
        { state: location.state || null }
      );
    }
    setValue(e?.target?.value.replace(/\s+/g, " "));
  };

  useEffect(() => setValue(""), [pathName]);

  useEffect(() => {
    if (searchData) {
      setValue(searchData);
    }
  }, [searchData]);

  return (
    <Search className="searchField">
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>

      <StyledInputBase
        placeholder={placeholder || "SEARCH"}
        inputProps={{ "aria-label": "search" }}
        name="searchValue"
        value={value}
        onChange={onChange}
        onKeyDown={onSearchChange}
        autoComplete={"off"}
        endAdornment={
          <InputAdornment position="end">
            {!!value && (
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                onClick={clearSearch}
              >
                <StyledCancelIcon />
              </IconButton>
            )}
          </InputAdornment>
        }
      />
    </Search>
  );
};

CustomSearchField.propTypes = {
  placeholder: propTypes.string,
};
