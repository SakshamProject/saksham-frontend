import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import queryString from "query-string";
import React, { useEffect, useMemo, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "white",
  border: `1px solid ${theme.palette.primary.main}`,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
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
  "& .MuiInputBase-input": {
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
    navigate({
      pathName: `${pathName}`,
      search: `?${createSearchParams({ ...data })}`,
    });
  };

  const onSearchChange = (e) => {
    if (e.charCode === 13) {
      navigate({
        pathName: `${pathName}`,
        search: `?${createSearchParams({
          ...pageParams,
          search: e.target.value.trim(),
          currentPage: 1,
        })}`,
      });
    }
  };

  useEffect(() => setValue(""), [pathName]);

  useEffect(() => {
    if (searchData) {
      setValue(searchData);
    }
  }, [searchData]);

  return (
    <Search style={{ backgroundColor: "white", width: "250px" }}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>

      <StyledInputBase
        placeholder={placeholder || "SEARCH"}
        inputProps={{ "aria-label": "search" }}
        name="searchValue"
        value={value}
        sx={{ fontSize: "0.875rem" }}
        onChange={(e) => {
          if (e.target.value.trim() === "") {
            navigate({
              pathName: `${pathName}`,
              search: `?${createSearchParams({
                ...pageParams,
                search: e.target.value.trim(),
              })}`,
            });
          }
          setValue(e.target.value.trim());
        }}
        onKeyPress={(e) => onSearchChange(e)}
        autoComplete="off"
        endAdornment={
          <InputAdornment position="end">
            {value && (
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
