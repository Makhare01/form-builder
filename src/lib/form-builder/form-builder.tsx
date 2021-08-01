import { Box, Paper, Typography, TextField, FormControlLabel, Checkbox, Button  } from '@material-ui/core'
import { ObjectSchema } from './types'
import {useState} from "react"
import { TypeEnum } from './Types/TypeEnum';
import { TypeArray } from './Types/TypeArray';
import { TypeObject } from './Types/TypeObject';

type Props = {
  jsonData: string
  schema: ObjectSchema
  onSubmit: (values: any) => void
}

export const FormBuilder = ({ jsonData, schema, onSubmit }: Props) => {
  const [country, setCountry] = useState<any>('');

  const handleChange = (value: any) => {
    setCountry(value);
  };

  let formJson;
  try {
    formJson = JSON.parse(jsonData);
  } catch(error) {
    console.log("error is" + error);
  }


  return (
    <TypeObject formJson={formJson} country={country} handleChange={handleChange} submitButton={true} />
  )
}
