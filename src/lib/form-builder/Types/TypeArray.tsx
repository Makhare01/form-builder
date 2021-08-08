import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, Paper } from '@material-ui/core'
import { TypeObject } from './TypeObject';

type Props = {
  valueHandler: (k: string, values: any) => void,
  k: string,
  dir: string,
  onSubmit: (values: any) => void,
  item: any,
}

export const TypeArray = ({k, dir, valueHandler, onSubmit, item}: Props) => { // component for array type

  const [objects, setObjects] = useState<any>(item.item);

  var uniqid = require('uniqid'); // generate unique id
  if(item.item.length === 1 && item.item[0].id === undefined) item.item[0].id = uniqid(); // set array first item uniq id

  const removeValues = (singleObj: any) => { // remove copied item input values
    if(singleObj.type === "object") {
      singleObj["properties"].map((obj: any) => {
        if(obj.type === "array") removeValues(obj)
        else  obj.value = ""
      })
    } else if(singleObj.type === "array") {
      singleObj["item"].map((obj: any) => {
        if(obj.type === "array") removeValues(obj)
        else  obj["properties"].map((i: any) => {
          i.value = ""
        })
      })
    }
  }

  const handleObject = () => { // add (copy) new array item
    let singleObj = JSON.parse(JSON.stringify(item.item[0]));
    let obj2 = { id: uniqid()}; // set new item unique id
    let mergedObj = { ...singleObj, ...obj2 };

    removeValues(singleObj);

    let newObjects = objects;
    newObjects = [...newObjects, mergedObj];
    item.item = [...item.item, mergedObj];
    setObjects(newObjects);
  }

  const handleDelete = (objId: any) => { // remove array element
    var iindex = item.item.map((x: any) => {
      return x.id
    }).indexOf(objId);

    item.item.splice(iindex, 1);

    setObjects([...item.item]);
  }

  return(
    <Box
      p={2}
      pb={4}
      mt={4}
      border={1}
      borderColor="grey.400"
      borderRadius={4}
      display="flex"
      flexDirection="column"
      component="div"
    >
      <Typography variant="h5" gutterBottom>
        {item.label}
      </Typography>
      {item.item.map((obj: any, index: string) => {
        return(
          <Grid container spacing={3}>
            <Grid item xs={10}>
              <Paper style={{ height: "100%", boxShadow: "none" }}>
                <TypeObject dir={dir+" -> "+obj.label} key={"obj-in"+index} valueHandler={valueHandler} k={k+"."+index} onSubmit={onSubmit} formJson={obj} submitButton={false} />
              </Paper>
            </Grid>

            <Grid item xs={2}>
              <Paper style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", boxShadow: "none" }}>
                <Button style={{ width: "70px" }} onClick={() => handleDelete(obj.id)} variant="outlined" color="secondary" disabled={item.item.length > 1 ? false : true}>Remove</Button> // remove button
              </Paper>
            </Grid>
          </Grid>
        )
      })}
      <Button onClick={handleObject} style={{ width: "70px" }} variant="outlined">Add</Button> // add button
    </Box>
  )
}
