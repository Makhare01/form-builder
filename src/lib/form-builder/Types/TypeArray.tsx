import React from "react";
import { Box, Typography, TextField } from '@material-ui/core'
import { TypeObject } from './TypeObject';

type Props = {
  item: any,
  country: string,
  handleChange: (values: any) => void
}

export const TypeArray = ({item, country, handleChange}: Props) => {

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
      <TypeObject formJson={item.item} country={country} handleChange={handleChange} submitButton={false} />
      {/* {item.item.properties.map((arrItem: any) => {
        return(
        <>
        {arrItem.type === "object" ? <TypeObject formJson={arrItem} country={country} handleChange={handleChange} submitButton={false} />
        : arrItem.type === "array" ? <TypeArray item={arrItem} country={country} handleChange={handleChange}/>
        :
          <TextField
            name={arrItem.name}
            label={arrItem.label}
            type={arrItem.type}
            required={item.required}
            variant="outlined"
          />
        }
        </>
        )
      })} */}
    </Box>
  )
}
