import { Box, Paper, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button  } from '@material-ui/core'
import { ObjectSchema } from './types'
import {useState} from "react"

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
    <Paper>
      {typeof(formJson) !== "undefined" ?
      <Box
        data-testid="root-form"
        p={2}
        display="flex"
        flexDirection="column"
        component="form"
        onSubmit={event => {
          // Code here
          // console.log("submited")
        }}
      >
        <Typography variant="h5" gutterBottom>
          {formJson.label}
        </Typography>
        {/* Code here */}

        {formJson.properties.map((item: any) => {
          return item.type === "enum" ?
            <FormControl variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">{item.label}</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                value={country}
                onChange={event => handleChange(event.target.value)}
                label={item.label}
              >
                {item.options.map((option: any) => {
                  return(
                    <MenuItem defaultValue="" value={option.value}>{option.label}</MenuItem>
                  )
                })}

              </Select>
            </FormControl>
          : item.type === "array" ?
            <Box
              p={2}
              border={1}
              borderColor="grey.500"
              display="flex"
              flexDirection="column"
              component="form"
              borderRadius={4}
            >
              <Typography variant="h5" gutterBottom>
                {item.label}
              </Typography>
              {item.item.properties.map((arrItem: any) => {
                return(
                <TextField
                  name={arrItem.name}
                  label={arrItem.label}
                  type={arrItem.type}
                  required
                  autoComplete="current-password"
                  variant="outlined"
                />)
              })}
            </Box>
          :
            <TextField
              name={item.name}
              label={item.label}
              type={item.type}
              required
              autoComplete="current-password"
              variant="outlined"
            />
        })}

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
      :
      <Box
        data-testid="root-form"
        p={2}
        display="flex"
        flexDirection="column"
        component="div"
        onSubmit={event => {
          // Code here
          // console.log("submited")
        }}
      >
        <Typography variant="h5" gutterBottom>
         { <p style={{ color: "red", margin: "0px" }}>Invalid Json</p>}
        </Typography>
      </Box>
      }
    </Paper>
  )
}
