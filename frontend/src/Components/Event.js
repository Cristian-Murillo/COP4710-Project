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
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "350px",
          height: "325px",
        }}
      >
        <CardHeader
          title={eventName}
          subheader={moment(eventDate).calendar()}
        ></CardHeader>
        <CardContent sx={{ textOverflow: "ellipsis" }}>
          <Typography
            variant="body2"
            sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
          >
            {description}
          </Typography>
          <Typography variant="caption text">
            <br />
            {contactEmail}
            <br />
            {address}
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: "flex-start" }}>
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
                    <div>{e.ratings + " star rating"}</div>
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
