import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Grid, useTheme } from "@mui/material";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import propTypes from "prop-types";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { CustomSelectField, CustomTextField } from ".";
import { filterQuerySeed } from "../../constants/seeds.js";
import useTableCustomHooks from "../../hooks/useTableCustomHooks.js";
import {
  CancelButton,
  FilterButtonModal,
  FilterContainerStyle,
  FilterFormStyle,
  FilterIconButton,
  FilterTitle,
  SubmitButton,
} from "../../styles";
import CustomTooltip from "./CustomTooltip.js";

export const FilterModal = ({ listPath, filterFields, filterFieldInitial }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pageParams = queryString.parse(location?.search);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const { tableReRenderActions } = useTableCustomHooks(location?.pathname);
  const { filterData } = tableReRenderActions();

  const onSubmit = (data) => {
    let getFilterValues = filterFields?.map((item) => ({
      operation: data[item?.queryName],
      field: item?.fieldName,
      value: data?.[item?.fieldName]?.trim(),
    }));
    let filterArray = getFilterValues.filter(
      (item) => item.operation && item.value
    );
    filterArray.length !== 0 &&
      navigate({
        pathName: listPath,
        search: `?${createSearchParams({
          ...pageParams,
          filter: JSON.stringify([...filterArray]),
        })}`,
      });
    handleClose();
  };

  const formik = useFormik({
    initialValues: filterFieldInitial,
    onSubmit,
  });

  const handleClearFilter = () => {
    const data = {
      ...pageParams,
    };
    delete data?.filter;
    navigate({
      pathName: `${listPath}`,
      search: `?${createSearchParams({
        ...data,
      })}`,
    });
    resetForm();
  };

  const { values, handleChange, resetForm, setFieldValue } = formik;

  useEffect(() => {
    filterFields?.map((item) => {
      const filterValue = filterData?.find(
        (filterItem) => filterItem?.field === item?.fieldName
      );
      setFieldValue(item?.fieldName, filterValue?.value);
      setFieldValue(item?.queryName, filterValue?.operation);
      return "";
    });
  }, []); //eslint-disable-line

  return (
    <>
      <CustomTooltip title={"Filter"}>
        <FilterIconButton onClick={handleOpen}>
          <FilterListIcon sx={{ fontSize: 24 }} />
        </FilterIconButton>
      </CustomTooltip>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          ".MuiModal-backdrop": {
            backgroundColor: theme.palette?.shadowColor?.main,
          },
        }}
      >
        <FilterContainerStyle>
          <FilterTitle>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ color: theme?.palette?.textColor?.white }}
            >
              Filter
            </Typography>

            <CustomTooltip title={"Close"}>
              <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
            </CustomTooltip>
          </FilterTitle>

          <form onSubmit={formik.handleSubmit}>
            <FilterFormStyle>
              {filterFields?.map((item, index) => {
                return (
                  <Grid
                    container
                    columnSpacing={3}
                    rowSpacing={2}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: 0,
                    }}
                    key={index + item?.label}
                  >
                    <Grid item xs={3}>
                      <Typography>{item?.label}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <CustomSelectField
                        label={"Query"}
                        inputValues={
                          item?.querySeeds
                            ? item?.querySeeds
                            : filterQuerySeed || []
                        }
                        name={item?.queryName}
                        onChange={handleChange}
                        value={values?.[item?.queryName] || ""}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <CustomTextField
                        label={"Value"}
                        name={item?.fieldName}
                        onChange={handleChange}
                        value={values?.[item?.fieldName] || ""}
                      />
                    </Grid>
                  </Grid>
                );
              })}
            </FilterFormStyle>
            <FilterButtonModal>
              <CancelButton onClick={handleClose}>Cancel</CancelButton>

              <CancelButton onClick={handleClearFilter}>
                Clear Filter
              </CancelButton>

              <SubmitButton variant="contained" type="submit">
                Apply
              </SubmitButton>
            </FilterButtonModal>
          </form>
        </FilterContainerStyle>
      </Modal>
    </>
  );
};

FilterModal.propTypes = {
  listPath: propTypes.string,
  filterFields: propTypes.array,
  filterFieldInitial: propTypes.object,
};
