import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardHeader,
  IconButton,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RateReviewIcon from "@mui/icons-material/RateReview";
import React, { useState } from "react";
import moment from "moment";
import HoverRating from "./Review";

function Event({ event }) {
  const { event_id, eventName, eventDate, description, contactEmail, address } =
    event;
  const [open, setOpen] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Card variant="outlined">
        <CardHeader
          action={
            <IconButton>
              <AddIcon />
            </IconButton>
          }
          title={eventName}
          subheader={moment(eventDate).calendar()}
        ></CardHeader>
        <CardContent>
          <Typography variant="body2">{description}</Typography>
          <Typography variant="caption text" sx={{ textOverflow: "ellipsis" }}>
            <br />
            {contactEmail}
            <br />
            {address}
          </Typography>
        </CardContent>

        <CardActions>
          <IconButton onClick={handleClickOpen}>
            <RateReviewIcon />
          </IconButton>
        </CardActions>
      </Card>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Reviews</DialogTitle>
          <DialogContent sx={{ maxHeight: 200, maxWidth: 1 }}>
            <DialogContentText>
              REVIEW DATA SOMEWHERE HERE REVIEW DATA SOMEWHERE HERE REVIEW DATA
              SOMEWHERE HERE REVIEW DATA SOMEWHERE HERE REVIEW DATA SOMEWHERE
              HERE REVIEW DATA SOMEWHERE HERE REVIEW DATA SOMEWHERE HERE REVIEW
              DATA SOMEWHERE HERE REVIEW DATA SOMEWHERE HERE REVIEW DATA
              SOMEWHERE HERE REVIEW DATA SOMEWHERE HERE REVIEW DATA SOMEWHERE
              HERE REVIEW DATA SOMEWHERE HERE REVIEW DATA SOMEWHERE HERE REVIEW
              DATA SOMEWHERE HERE REVIEW DATA SOMEWHERE HERE REVIEW DATA
              SOMEWHERE HERE REVIEW DATA SOMEWHERE HERE
            </DialogContentText>
          </DialogContent>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="comment"
              label="Review"
              value={commentValue}
              fullWidth
              variant="standard"
            />{" "}
            <HoverRating event={event_id} comment={commentValue} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Post Review</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
export default Event;
