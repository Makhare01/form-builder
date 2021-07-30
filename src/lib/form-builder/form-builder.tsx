import { Box, Paper, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button  } from '@material-ui/core'
import { ObjectSchema } from './types'
import {useState} from "react"

type Props = {
  schema: ObjectSchema
  onSubmit: (values: any) => void
}

export const FormBuilder = ({ schema, onSubmit }: Props) => {
  const [country, setCountry] = useState<any>(null);

  const handleChange = (value: any) => {
    setCountry(value);
  };

  return (
    <Paper>
      <Box
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
          {schema.label}
        </Typography>
        {/* Code here */}
        {schema.properties.map((item, index) => {
          return item.type === "enum" ?
            <FormControl variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">{item.label}</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={country}
                onChange={event => handleChange(event.target.value)}
                label={item.label}
              >
                {item.options.map(option => {
                  return(
                    <MenuItem value={option.value}>{option.label}</MenuItem>
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
              {item.item.properties.map(arrItem => {
                return(
                <TextField
                  id="outlined-password-input"
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
              id="outlined-password-input"
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
    </Paper>
  )
}
