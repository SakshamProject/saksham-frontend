import { Box, IconButton } from "@mui/material";

import { DeleteIcon, EditIcon } from "../../styles/buttonStyle";

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
        <IconButton disabled={isViewMode} onClick={onEdit}>
          <EditIcon />
        </IconButton>
      )}
      {!disableDelete && (
        <IconButton disabled={isViewMode} onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      )}
    </Box>
  );
};
