/* eslint-disable react-hooks/exhaustive-deps */
import {
  AudioFile,
  Cancel,
  FileUpload as FileUploadIcon,
  UploadFile,
  VideoFile,
} from "@mui/icons-material";
import { Box, FormControl, FormHelperText, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import propTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import useResponsive from "../../../hooks/useResponsive";
import { dispatchSnackbarError } from "../../../utils/dispatch";

const InputField = styled("input")(() => ({
  display: "none",
}));

const FileInputHolder = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: 10,
  border: `1px dashed ${theme.palette?.commonColor?.lightGrey}`,
  height: "35px !important",
  borderRadius: 5,
  svg: { fontSize: "29px" },
}));

const ImgTag = styled("img")(() => ({
  height: 40,
  width: 40,
  borderRadius: "50%",
  marginRight: 12,
}));

export const FileUpload = ({
  name,
  label,
  type,
  value,
  onChange,
  defaultLabel,
  setFieldValue,
  disabled,
  isMultiRec,
  accept,
  touched,
  error,
  customHelperText,
  disableResetForAllValues,
  style,
}) => {
  const [imgUrl, setImgUrl] = useState("");
  const [fileName, setFileName] = useState(value ? value[0]?.name : "");
  const myRefname = useRef(null);
  const [key, setKey] = useState(false);
  const { theme } = useResponsive();

  const handleClick = () => myRefname.current.click();

  const onImageChange = (event) => {
    if (event?.target?.files[0]?.size > 1024 * 1024 * 5) {
      return dispatchSnackbarError("Size should be less than 5MB");
    } else if (event?.target?.files[0]) {
      let reader = new FileReader();
      reader.onload = () => {
        if (type === "image" || type === "GIF") {
          setImgUrl(reader.result);
        }
        onChange(event);
        if (!isMultiRec) {
          setFileName(event?.target?.files[0]?.name);
        }
      };
      if (
        !type ||
        event?.target?.files[0]?.type.includes(type === "gif" ? "image" : type)
      ) {
        reader.readAsDataURL(event?.target?.files[0]);
      } else {
        dispatchSnackbarError("Media type not supported");
      }
    }
  };

  useEffect(() => {
    if ((type === "image" || type === "GIF") && typeof value === "string") {
      setImgUrl(value);
    }
  }, [type, value]);

  useEffect(() => {
    if (!value && defaultLabel) {
      setImgUrl("");
      setFileName("");
    } else if (typeof value === "string") {
      setFileName(label);
    } else {
      setFileName(value?.name);
    }
  }, [value]);

  const errorBorder =
    error && touched
      ? { border: `1.8px dashed ${theme?.palette?.commonColor?.red} ` }
      : {};

  const errorText =
    error && touched
      ? { color: theme?.palette?.commonColor?.red }
      : { color: theme?.palette?.shadowColor?.dark };

  const imageIcon = () => {
    if (type === "image" || type === "GIF") {
      return imgUrl ? (
        <ImgTag src={imgUrl} alt=""></ImgTag>
      ) : (
        <IconButton style={errorText}>
          <FileUploadIcon style={{ width: 24, height: 24 }} />
        </IconButton>
      );
    } else if (type === "audio") {
      return (
        <IconButton style={errorText}>
          <AudioFile />
        </IconButton>
      );
    } else if (type === "video") {
      return (
        <IconButton style={errorText}>
          <VideoFile />
        </IconButton>
      );
    } else {
      return (
        <IconButton style={errorText}>
          <UploadFile />
        </IconButton>
      );
    }
  };

  const resetValues = () => {
    if (type === "image") {
      setFieldValue(`${name}File`, null);
      setFieldValue(`${name}FileName`, null);
    }
    setImgUrl("");
    setFieldValue(name, null);
    if (!disableResetForAllValues) {
      setFieldValue(`${name}FileName`, "");
    }
    setKey(!key);
    setFileName("");
    onChange();
  };

  useEffect(() => {
    setKey(!key);
    if (value === "") setFileName("");
  }, [value]);

  return (
    <FormControl fullWidth>
      <InputField
        ref={myRefname}
        name={name}
        key={key}
        type={"file"}
        onChange={(event) => onImageChange(event)}
        label={label}
        disabled={disabled}
        accept={type === "GIF" ? "image/*" : accept}
        error={Boolean(customHelperText || (touched && error))}
      />

      <FileInputHolder
        className="label"
        sx={{
          padding: "27.5px 10px",
          ...errorBorder,
          cursor: disabled ? "auto" : "pointer",
          position: "relative",
          ...style,
        }}
        onClick={() => handleClick()}
      >
        {fileName && (
          <Box
            style={{
              position: "absolute",
              top: "-10px",
              left: "15px",
              background: theme?.palette?.commonColor?.white,
              padding: "0 5px",
              fontSize: "13px",
              color: theme?.palette?.commonColor?.grey,
            }}
          >
            {defaultLabel}
          </Box>
        )}
        {imageIcon()}
        <div
          className="label"
          style={{
            width: "80%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            ...errorText,
          }}
        >
          {fileName || defaultLabel || label}
        </div>
        {!disabled && value && (
          <IconButton
            sx={{ transform: "scale(.8)" }}
            onClick={(event) => {
              event.stopPropagation();
              resetValues();
            }}
          >
            <Cancel />
          </IconButton>
        )}
      </FileInputHolder>

      <FormHelperText error>
        {customHelperText || (touched && error) || " "}
      </FormHelperText>
    </FormControl>
  );
};

FileUpload.propTypes = {
  value: propTypes.oneOfType([propTypes.string, propTypes.object]),
  touched: propTypes.oneOfType([propTypes.bool, propTypes.object]),
  error: propTypes.string,
  customHelperText: propTypes.string,
  name: propTypes.string,
  label: propTypes.string,
  disabled: propTypes.bool,
  type: propTypes.string,
  onChange: propTypes.func,
  defaultLabel: propTypes.string,
  setFieldValue: propTypes.func,
  accept: propTypes.string,
  isMultiRec: propTypes.bool,
  disableResetForAllValues: propTypes.bool,
  style: propTypes.object,
};
