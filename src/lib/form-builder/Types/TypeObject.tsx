import React from "react";
import { Paper, Box, Typography, TextField, FormControlLabel, Checkbox, Button  } from '@material-ui/core'
import { TypeEnum } from './TypeEnum';
import { TypeArray } from './TypeArray';


type Props = {
  formJson: any,
  country: string,
  handleChange: (values: any) => void,
  submitButton: boolean,
}

export const TypeObject = ({formJson, country, handleChange, submitButton}: Props) => {

  return(
    <Paper style={{ marginBottom: "30px" }}>
    {typeof(formJson) !== "undefined" ?
      formJson.type !== "object" ?
      <Box
        pl={2}
        pr={2}
        pb={4}
        // my={4}
        display="flex"
        flexDirection="column"
        component="div"
      >
        <Typography variant="h5" gutterBottom>
         { <p style={{ color: "red", margin: "0px" }}>Invalid Schema</p>}
         { <p style={{ marginTop: "15px", fontSize: "16px" }}>The object type is <span style={{ color: "red" }}>"{formJson.type}"</span> instead of Object</p>}
        </Typography>
      </Box>
      :
      <Box
        data-testid="root-form"
        p={2}
        pb={4}
        display="flex"
        flexDirection="column"
        component="form"
        onSubmit={event => {
          // Code here
          console.log("submited")
        }}
      >
        <Typography variant="h5" gutterBottom>
          {formJson.label}
        </Typography>
        {/* Code here */}

        {formJson.properties.map((item: any) => {
          return item.type === "object" ?
            <TypeObject formJson={item} country={country} handleChange={handleChange} submitButton={false} />
          :
          item.type === "enum" ?
            <TypeEnum item={item} country={country} handleChange={handleChange} />
          : item.type === "array" ?
            <TypeArray item={item} country={country} handleChange={handleChange} />
          : item.type === "number" ?
            <TextField
              name={item.name}
              label={item.label}
              type={item.type}
              required={item.required}
              inputProps={{
                min: item.minimum,
                max: item.maximum,
              }}
              variant="outlined"
            />
          :
            item.type === "string" && item.name === "phone" ?
            <TextField
              name={item.name}
              label={item.label}
              type={item.inputType}
              required={item.required}
              inputProps={{
                pattern: item.pattern,
                minLength: item.minLength,
                maxLength: item.maxLength,
              }}
              variant="outlined"
            />
          : item.type === "boolean" ?
            <FormControlLabel
              value="end"
              control={<Checkbox color="primary" />}
              label={item.label}
              labelPlacement="end"
            />
          :
            <TextField
              name={item.name}
              label={item.label}
              type={item.type}
              required={item.required}
              multiline={item.multiline}
              variant="outlined"
            />
        })}
        {submitButton ?
          <Button style={{ marginTop: "30px" }} variant="contained" color="primary" type="submit">
            Submit
          </Button>
        :
          ""
        }
      </Box>
      :
      <Box
        data-testid="root-form"
        p={2}
        display="flex"
        flexDirection="column"
        component="div"
      >
        <Typography variant="h5" gutterBottom>
         { <p style={{ color: "red", margin: "0px" }}>Invalid Json</p>}
        </Typography>
      </Box>
      }
    </Paper>
  )
}
