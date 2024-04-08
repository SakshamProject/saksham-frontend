import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Grid, useTheme } from "@mui/material";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import queryString from "query-string";
import { useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";

import { CustomSelectField, CustomTextField } from ".";
import {
  APPLY,
  CANCEL,
  CLEAR_FILTER,
} from "../../constants/globalConstants.js";
import {
  CancelButton,
  FilterButtonModal,
  FilterContainerStyle,
  FilterFormStyle,
  FilterIconButton,
  FilterTitle,
  SubmitButton,
} from "../../styles";

export const FilterModal = ({ listPath, filterFields, filterFieldInitial }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pageParams = queryString.parse(location?.search);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();

  const onSubmit = (data) => {
    let getFilterValues = filterFields.map((item) => ({
      type: data[item?.queryName],
      field: item?.fieldName,
      value: data?.[item?.fieldName]?.trim(),
    }));
    let filterArray = getFilterValues.filter((item) => item.type && item.value);
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

  const { values, handleChange, resetForm } = formik;

  return (
    <>
      <FilterIconButton onClick={handleOpen}>
        <FilterListIcon sx={{ fontSize: 24 }} />
      </FilterIconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FilterContainerStyle>
          <FilterTitle>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ color: theme?.palette?.textColor?.main }}
            >
              Filter
            </Typography>
            <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
          </FilterTitle>

          <form onSubmit={formik.handleSubmit}>
            <FilterFormStyle>
              {filterFields?.map((item, index) => {
                return (
                  <Grid
                    container
                    columnSpacing={4}
                    rowSpacing={3}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: 0,
                    }}
                    key={index}
                  >
                    <Grid item xs={3}>
                      <Typography>{item?.label}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <CustomSelectField
                        label={"Query"}
                        inputValues={item.querySeeds ? item.querySeeds : []}
                        name={item?.queryName}
                        onChange={handleChange}
                        value={values?.[item?.queryName] || ""}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <CustomTextField
                        label={"Value"}
                        name={item.fieldName}
                        onChange={handleChange}
                        value={values[item.fieldName] || ""}
                      />
                    </Grid>
                  </Grid>
                );
              })}
            </FilterFormStyle>
            <FilterButtonModal>
              <CancelButton onClick={handleClose}>{CANCEL}</CancelButton>

              <CancelButton onClick={handleClearFilter}>
                {CLEAR_FILTER}
              </CancelButton>

              <SubmitButton variant="contained" type="submit">
                {APPLY}
              </SubmitButton>
            </FilterButtonModal>
          </form>
        </FilterContainerStyle>
      </Modal>
    </>
  );
};
