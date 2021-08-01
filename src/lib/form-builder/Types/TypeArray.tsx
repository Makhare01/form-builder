import React, {useState} from "react";
import { Box, Typography, Button, Grid, Paper } from '@material-ui/core'
import { TypeObject } from './TypeObject';

type Props = {
  item: any,
  country: string,
  handleChange: (values: any) => void
}

export const TypeArray = ({item, country, handleChange}: Props) => {

  const [objects, setObjects] = useState<any>(item.item);
  // console.log("object = " + objects);
  console.log("object2 = " + item.properties);

  const handleObject = () => {
    let myObj = {
      "type": "object",
      "name": "technology",
      "properties": [
        {
          "type": "string",
          "label": "Technology",
          "name": "technology",
          "required": true
        },
        {
          "type": "number",
          "label": "Experience (years)",
          "name": "experience",
          "integer": true,
          "required": true
        }
      ]
    };

    objects.push(myObj);
    setObjects(objects);
    console.log(objects);

  }

  return(
    <Box
      p={2}
      pb={4}
      mt={4}
      border={1}
      borderColor="grey.400"
      display="flex"
      flexDirection="column"
      component="div"
      borderRadius={4}
    >
      <Typography variant="h5" gutterBottom>
        {item.label}
      </Typography>
      {objects.map((obj: any) => {
        return(
          <Grid container spacing={3}>
            <Grid item xs={10}>
              <Paper style={{ height: "100%", boxShadow: "none" }}>
                <TypeObject formJson={obj} country={country} handleChange={handleChange} submitButton={false} />
              </Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", boxShadow: "none" }}>
                <Button style={{ width: "70px" }} variant="outlined" color="secondary">Remove</Button>
              </Paper>
            </Grid>
          </Grid>
        )
      })}
      <Button onClick={handleObject} style={{ width: "70px" }} variant="outlined">Add</Button>
    </Box>
  )
}
