import axios from "axios";
import React from "react";
import { Card } from "@mui/material";
import { Typography } from "@mui/material";
function Singlepost(props) {
  let id = props.match.params.id;
  const [item, setItem] = React.useState({
    _id: "",
    post: [],
  });

  React.useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    await axios
      .get(`https://vocabulary-251.herokuapp.com/getPost/${id}`)
      .then((response) => {
        setItem(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      {
        <Card sx={{ width: "90%", margin: "1rem" }}>
          <Typography variant="h4">{item._id}</Typography>
          {item.post.map((card, index) => {
            return (
              <div className="Boxcard" key={index}>
                <Typography className="text" variant="h5">
                  {card.lexicalCategory.text}
                </Typography>
                <Typography className="text" variant="h6">
                  Definition :
                </Typography>
                <Typography>
                  {card.entries[0].senses[0].definitions[0]}
                </Typography>

                {card.phrases ? (
                  <>
                    <Typography>Example Phrases:</Typography>
                    {card.phrases.map((phrase, index) => {
                      return <li>{phrase.text}</li>;
                    })}
                  </>
                ) : null}
              </div>
            );
          })}
        </Card>
      }
    </div>
  );
}

export default Singlepost;
