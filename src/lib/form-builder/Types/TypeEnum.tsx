import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

type Props = {
  item: any,
  country: string,
  handleChange: (values: any) => void
}

export const TypeEnum = ({item, country, handleChange}: Props) => {

  return(
    <FormControl variant="outlined">
      <InputLabel>{item.label}</InputLabel>
      <Select
        value={country}
        onChange={event => handleChange(event.target.value)}
        label={item.label}
        required={item.required}
      >
        {item.options.map((option: any) => {
          return(
            <MenuItem defaultValue="" value={option.value}>{option.label}</MenuItem>
          )
        })}

      </Select>
    </FormControl>
  )
}
