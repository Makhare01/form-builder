import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

type Props = {
  valueHandler: (k: string, values: any) => void,
  k: string,
  item: any,
  allVals: any,
  handleValue: (e: any) => void,
}

export const TypeEnum = ({k, valueHandler, item, allVals, handleValue}: Props) => {
  return(
    <FormControl variant="outlined">
      <InputLabel>{item.label}</InputLabel>
      <Select
        // value={country}
        // onChange={event => handleChange(event.target.value)}
        className="INPUT"
        id="country"
        type={item.type}
        name={item.name}
        defaultValue=""
        value={allVals[item.name]}
        // onChange={handleValue}
        onChange={(e) => valueHandler(k, e.target.value)}
        label={item.label}
        required={item.required}
      >
        {item.options.map((option: any, index: number) => {
          return(
            <MenuItem defaultValue="" id={item.name+index} value={option.value}>{option.label}</MenuItem>
          )
        })}

      </Select>
    </FormControl>
  )
}
