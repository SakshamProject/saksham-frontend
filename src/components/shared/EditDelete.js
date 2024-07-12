import { Box, IconButton } from "@mui/material";
import propTypes from "prop-types";
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
          <EditIcon disabled={isViewMode} />
        </IconButton>
      )}
      {!disableDelete && (
        <IconButton disabled={isViewMode} onClick={onDelete}>
          <DeleteIcon disabled={isViewMode} />
        </IconButton>
      )}
    </Box>
  );
};

EditDelete.propTypes = {
  onEdit: propTypes.func,
  onDelete: propTypes.func,
  disableEdit: propTypes.bool,
  disableDelete: propTypes.bool,
  isViewMode: propTypes.bool,
};
