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

  var uniqid = require('uniqid');
  let singleObj = objects[0];

  const handleObject = (objId: any) => {
    // console.log()
    singleObj.id = objId;
    let newObjects = objects;
    newObjects.push(singleObj);

    // newObjects.map((myObj: any) => {
    //   myObj["id"] = objId;
    // })
    setObjects([...newObjects]);
  }

  const handleDelete = (objId: any) => {
    console.log(objId)
    // setObjects([...objects.filter((item: any, i: any) => i != objId)]);

    // const allObjects = objects;
    // const newObjects = allObjects.filter((item: any) => {
    //   return item["id"] != objId;
    // });

    // setObjects([...newObjects]);
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
      {objects.map((obj: any, index: number) => {
        return(
          <Grid container spacing={3}>
            <Grid item xs={10}>
              <Paper style={{ height: "100%", boxShadow: "none" }}>
                <TypeObject formJson={obj} id={"object" + index} country={country} handleChange={handleChange} submitButton={false} />
              </Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", boxShadow: "none" }}>
                <Button style={{ width: "70px" }} onClick={() => handleDelete(index)} variant="outlined" color="secondary">Remove</Button>
                <p>{obj.id}</p>
              </Paper>
            </Grid>
          </Grid>
        )
      })}
      <Button onClick={() => {
        handleObject(uniqid())
      }} style={{ width: "70px" }} variant="outlined">Add</Button>
    </Box>
  )
}
