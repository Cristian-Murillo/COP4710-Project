import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { UserContext } from "./UserContext";
import axios from "axios";
import { Button } from "@mui/material";
import { Typography, TextField } from "@mui/material";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function HoverRating({ event }) {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [commentValue, setCommentValue] = React.useState("");

  const { user } = React.useContext(UserContext);

  var bp = require("./Path");

  const HandleSubmitReview = (e) => {
    e.preventDefault();

    const postReview = async () => {
      const reviewData = {
        event_id: event,
        user_id: user.id,
        comment: commentValue,
        ratings: value,
      };
      try {
        var config = {
          method: "post",
          url: bp.buildPath("api/comments/review"),
          // headers: { Authorization:"TOKEN GOES HERE"}
          data: reviewData,
        };

        const resp = await axios(config);

        console.log(resp.data);
      } catch (err) {
        console.error(err);
      }
    };
    postReview();
  };

  const handleDelete = (e) => {
    e.preventDefault();

    const deleteReview = async () => {
      const deleteInfo = {
        event_id: event,
        user_id: user.id,
      };
      var config = {
        method: "delete",
        url: bp.buildPath("api/comments/delete"),
        // headers: { Authorization:"TOKEN GOES HERE"}
        data: deleteInfo,
      };
      try {
        console.log(deleteInfo);

        const resp = await axios(config);

        console.log(resp.data);
      } catch (err) {
        console.log("catching " + err);
      }
    };
    deleteReview();
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updateReview = async () => {
      const updateInfo = {
        event_id: event,
        user_id: user.id,
        comment: commentValue,
        ratings: value,
      };
      var config = {
        method: "post",
        url: bp.buildPath("api/comments/update"),
        // headers: { Authorization:"TOKEN GOES HERE"}
        data: updateInfo,
      };
      try {
        console.log(updateInfo);

        const resp = await axios(config);

        console.log(resp.data);
      } catch (err) {
        console.log("catching " + err);
      }
    };
    updateReview();
  };
  return (
    <>
      <TextField
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
      />
      <Box
        sx={{
          width: 200,
          display: "flex",
          alignItems: "center",
        }}
      >
        {" "}
        <Rating
          name="hover-feedback"
          value={value}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {value !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
        )}
      </Box>
      <Button onClick={HandleSubmitReview}>Post</Button>
      <Button onClick={handleDelete}>Delete Review</Button>
      <Button onClick={handleUpdate}>Update Review</Button>
    </>
  );
}
