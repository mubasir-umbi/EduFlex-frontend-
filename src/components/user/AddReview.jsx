import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Rating, TextField, Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import AlertDialog from "../AlertDialog";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddReview({
  submitHandler,
  upadateHandler,
  courseId,
  edit,
  reviewVal,
  ratingVal,
  reviewId,
  deleteHandler,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rating, setRating] = React.useState(ratingVal);
  const [review, setReview] = React.useState(reviewVal);

  return (
    <>
      {edit && (
        <>
          <Tooltip title="Edit">
            <Button onClick={handleOpen} sx={{ p: 0 }}>
              <EditIcon sx={{ width: "17px" }} /> 
            </Button>
          </Tooltip>
          <Tooltip title="Delete">
            <AlertDialog
              deleteHandler={deleteHandler}
              item={"review"}
              reviewId={reviewId}
            />
          </Tooltip>
        </>
      )}
      <Box>
        {!edit ? (
          <Button
            size="small"
            sx={{
              mb: 2,
              ml: 2,
            }}
            style={{ textTransform: "capitalize" }}
            variant="text"
            onClick={handleOpen}
          >
            Add review
          </Button>
        ) : (
          ""
        )}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {edit ? "Edit review" : "Add a review about this cours"}
            </Typography>
            <TextField
              value={review}
              onChange={(e) => {
                console.log(e.target.value);
                setReview(e.target.value);
              }}
              sx={{ width: "100%", mt: 2 }}
            />

            <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
              {edit ? "" : "We will be appriciated your valueble rating"}
            </Typography>
            <Rating
              value={rating}
              precision={0.5}
              onChange={(e) => {
                setRating(e.target.value);
              }}
            ></Rating>
            <Box mt={2}>
              <Button
                onClick={() => {
                  setOpen(false);
                  if (edit) {
                    upadateHandler(rating, review, reviewId);
                  } else {
                    if (!rating || !review) {
                      return toast.error("Invalid input");
                    }
                    submitHandler(rating, review, courseId);
                  }
                }}
                variant="contained"
                style={{ textTransform: "capitalize" }}
              >
                {edit ? "Update" : "Submit"}
              </Button>

              <Button
                sx={{ ml: 1 }}
                onClick={() => {
                  setOpen(false);
                }}
                variant="outlined"
                style={{ textTransform: "capitalize" }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  );
}
