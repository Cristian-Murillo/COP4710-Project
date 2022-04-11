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
import React, { useState, useEffect } from "react";
import moment from "moment";
import HoverRating from "./Review";
import axios from "axios";

function Event({ event }) {
  const { event_id, eventName, eventDate, description, contactEmail, address } =
    event;
  const [open, setOpen] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const bp = require("./Path");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getReviews = async () => {
      try {
        var config = {
          method: "get",
          url: bp.buildPath("api/comments/reviews/" + event_id),
          // headers: { Authorization:"TOKEN GOES HERE"}
        };

        const resp = await axios(config);

        setReviewList(resp.data);
      } catch (err) {
        console.error(err);
      }
    };
    getReviews();
  }, [open]);

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
              {reviewList.map((e, idx) => {
                return (
                  <div key={idx}>
                    {e.comment}
                    <div>{e.ratings}</div>
                  </div>
                );
              })}
            </DialogContentText>
          </DialogContent>
          <DialogContent>
            {/* <TextField
              autoFocus
              margin="dense"
              id="comment"
              label="Review"
              value={commentValue}
              onChange={(e) => {
                setCommentValue(e.target.value);
              }}
              fullWidth
              variant="standard"
            />{" "} */}
            <HoverRating event={event_id} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
export default Event;
