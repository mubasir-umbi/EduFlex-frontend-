import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, TextField, Tooltip } from "@mui/material";

export default function AlertDialog({
  item,
  deleteHandler,
  reviewId,
  value,
  qstEditHandler,
  qstDeleteHandler,
  id,
  replyDeleteHandler,
  replyEditHandler
}) {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState(value);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {item === "review" && (
        <Tooltip title={"Delete"}>
          <Button
            sx={{ p: 0 }}
            size="small"
            variant="text"
            onClick={handleClickOpen}
          >
            <DeleteIcon sx={{ width: "17px", p: 0, opacity: 0.1 }} />
          </Button>
        </Tooltip>
      )}

      {item === "question" && (
        <Tooltip title={"Delete"}>
          <Box
            sx={{ p: 0, cursor: "pointer" }}
            mr={1}
            mt={1}
            onClick={handleClickOpen}
          >
            <DeleteIcon sx={{ width: "15px" }} />
          </Box>
        </Tooltip>
      )}

      {item === "qstnEdit" && (
        <Tooltip title={"Edit"}>
          <Box
            sx={{ p: 0, cursor: "pointer" }}
            mr={1}
            mt={1}
            onClick={handleClickOpen}
          >
            <EditIcon sx={{ width: "15px" }} />
          </Box>
        </Tooltip>
      )}

      {item === "reply" && (
        <Tooltip title={"Delete"}>
          <Box
            sx={{ p: 0, cursor: "pointer" }}
            mr={1}
            mt={1}
            onClick={handleClickOpen}
          >
            <DeleteIcon sx={{ width: "15px" }} />
          </Box>
        </Tooltip>
      )}

      {item === "replyEdt" && (
        <Tooltip title={"Edit"}>
          <Box
            sx={{ p: 0, cursor: "pointer" }}
            mr={1}
            mt={1}
            onClick={handleClickOpen}
          >
            <EditIcon sx={{ width: "15px" }} />
          </Box>
        </Tooltip>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {(item === "qstnEdit" &&  `Edit question?`)}
          {(item === 'replyEdt' && `Edit Reply?`)}
          {item !== "qstnEdit" && item !== 'replyEdt' && "Alert?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {(item === "question" || item === "review" || item === 'reply') &&
              `Are you sure want to delete ${item}?`}
          </DialogContentText>
        </DialogContent>
        {(item === "qstnEdit" || item === "replyEdt") && (
          <Box sx={{ minWidth: 400, p: 3 }}>
            <TextField
              onChange={(e) => {
                setText(e.target.value);
              }}
              value={text}
              autoFocus
              margin="dense"
              id="name"
              label="your question"
              type="text"
              fullWidth
              variant="standard"
            />
          </Box>
        )}
        <DialogActions>
          <Button style={{ textTransform: "capitalize" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            style={{ textTransform: "capitalize" }}
            onClick={() => {
              (item === "review" && deleteHandler(reviewId)) ||
                (item === "qstnEdit" && qstEditHandler(id, text)) ||
                (item === "question" && qstDeleteHandler(id))||
                (item === "replyEdt" && replyEditHandler(id, text)) ||
                (item === "reply" && replyDeleteHandler(id))
              handleClose();
            }}
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
