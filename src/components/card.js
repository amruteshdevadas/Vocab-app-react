import React from "react";
import { Card } from "@mui/material";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
function card(props) {
  const { item } = props;
  // console.log(item)
  return (
    <Card sx={{ width: "90%", margin: "1rem" }}>
      <Link
        to={`singlepost/${item._id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Typography variant="h4">{item._id}</Typography>
        {item.post.map((card, index) => {
          return (
            <div className="Boxcard">
              <Typography className="text" variant="h5">
                {card.lexicalCategory.text}
              </Typography>
              <Typography>
                {card.entries[0].senses[0].definitions[0]}
              </Typography>
            </div>
          );
        })}
      </Link>
    </Card>
  );
}

export default card;
