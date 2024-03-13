import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React from "react";

export const EditDelete = ({
  onEdit,
  onDelete,
  disableEdit,
  disableDelete,
  isViewMode,
}) => {
  return (
    <Box style={{ display: "flex" }}>
      {!disableEdit && (
        <IconButton color="primary" disabled={isViewMode} onClick={onEdit}>
          <Edit />
        </IconButton>
      )}
      {!disableDelete && (
        <IconButton color="primary" disabled={isViewMode} onClick={onDelete}>
          <Delete />
        </IconButton>
      )}
    </Box>
  );
};
