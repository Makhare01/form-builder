import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, Paper } from '@material-ui/core'
import { TypeObject } from './TypeObject';

type Props = {
  valueHandler: (k: string, values: any) => void,
  setJsonInput: (values: any) => void,
  k: string,
  onSubmit: (values: any) => void,
  formJson: any,
  item: any,
}

export const TypeArray = ({k, valueHandler, setJsonInput, onSubmit, formJson, item}: Props) => {

  const [objects, setObjects] = useState<any>(item.item);

  // console.log(formJson);

  var uniqid = require('uniqid');
  if(objects.length === 1 && objects[0].id === undefined) objects[0].id = uniqid();

  const handleObject = () => {
    let singleObj = {...item.item[0]};
    let obj2 = { id: uniqid()};
    let mergedObj = { ...singleObj, ...obj2 };

    let newObjects = objects;
    newObjects = [...newObjects, mergedObj];
    item.item = [...item.item, mergedObj];
    setObjects(newObjects);
  }

  const handleDelete = (objId: any) => {
    // const allObjects = [...objects];
    // const newObjects = allObjects.filter((item: any) => {
    //   return item["id"] !== objId;
    // });

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
      {objects.map((obj: any, index: string) => {
        return(
          <Grid container spacing={3}>
            <Grid item xs={10}>
              <Paper style={{ height: "100%", boxShadow: "none" }}>
                <TypeObject key={"obj-in"+index} valueHandler={valueHandler} setJsonInput={setJsonInput} k={k+"."+index} onSubmit={onSubmit} formJson={obj} submitButton={false} />
              </Paper>
            </Grid>

            <Grid item xs={2}>
              <Paper style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", boxShadow: "none" }}>
                {objects.length > 1 ?
                  <Button style={{ width: "70px" }} onClick={() => handleDelete(obj.id)} variant="outlined" color="secondary">Remove</Button>
                :
                  <Button style={{ width: "70px" }} variant="outlined" disabled>Remove</Button>
                }
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
