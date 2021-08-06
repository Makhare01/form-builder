import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

type Props = {
  valueHandler: (k: string, values: any) => void,
  k: string,
  item: any,
}

export const TypeEnum = ({k, valueHandler, item}: Props) => {
  return(
    <FormControl variant="outlined">
      <InputLabel>{item.label}</InputLabel>
      <Select
        id="country"
        type={item.type}
        name={item.name}
        defaultValue=""
        onChange={(e) => valueHandler(k, e.target.value)}
        label={item.label}
        required={item.required}
      >
        {item.options.map((option: any, index: number) => {
          return(
            <MenuItem key={"opt"+index} defaultValue="" id={item.name+index} value={option.value}>{option.label}</MenuItem>
          )
        })}

      </Select>
    </FormControl>
  )
}
