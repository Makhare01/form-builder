import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, Paper } from '@material-ui/core'
import { TypeObject } from './TypeObject';

type Props = {
  valueHandler: (k: string, values: any) => void,
  k: string,
  onSubmit: (values: any) => void,
  item: any,
}

export const TypeArray = ({k, valueHandler, onSubmit, item}: Props) => {

  const [objects, setObjects] = useState<any>(item.item);

  var uniqid = require('uniqid');
  if(item.item.length === 1 && item.item[0].id === undefined) item.item[0].id = uniqid();

  const removeValues = (singleObj: any) => {
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

  const handleObject = () => {
    let singleObj = JSON.parse(JSON.stringify(item.item[0]));
    let obj2 = { id: uniqid()};
    let mergedObj = { ...singleObj, ...obj2 };

    removeValues(singleObj);

    let newObjects = objects;
    newObjects = [...newObjects, mergedObj];
    item.item = [...item.item, mergedObj];
    setObjects(newObjects);
  }

  const handleDelete = (objId: any) => {
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
      display="flex"
      flexDirection="column"
      component="div"
      borderRadius={4}
    >
      <Typography variant="h5" gutterBottom>
        {item.label}
      </Typography>
      {item.item.map((obj: any, index: string) => {
        return(
          <Grid container spacing={3}>
            <Grid item xs={10}>
              <Paper style={{ height: "100%", boxShadow: "none" }}>
                <TypeObject key={"obj-in"+index} valueHandler={valueHandler} k={k+"."+index} onSubmit={onSubmit} formJson={obj} submitButton={false} />
              </Paper>
            </Grid>

            <Grid item xs={2}>
              <Paper style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", boxShadow: "none" }}>
                <Button style={{ width: "70px" }} onClick={() => handleDelete(obj.id)} variant="outlined" color="secondary" disabled={item.item.length > 1 ? false : true}>Remove</Button>
                <p>{obj.id}</p>
              </Paper>
            </Grid>
          </Grid>
        )
      })}
      <Button onClick={handleObject} style={{ width: "70px" }} variant="outlined">Add</Button>
    </Box>
  )
}
