import {useEffect} from "react";
import { Paper, Box, Typography, TextField, FormControlLabel, Checkbox, Button  } from '@material-ui/core'
import { TypeEnum } from './TypeEnum';
import { TypeArray } from './TypeArray';


type Props = {
  valueHandler: (k: string, values: any) => void,
  k: string,
  dir: string,
  onSubmit: (values: any) => void,
  formJson: any,
  submitButton: boolean,
}

export const TypeObject = ({k, dir, valueHandler, onSubmit, formJson, submitButton}: Props) => { // component for Object type

  return(
    <Paper style={{ marginBottom: "30px" }}>
    {typeof(formJson) !== "undefined" ?
      formJson.type !== "object" ? // when isn't object outputs error
      <Box
        pl={2}
        pr={2}
        pb={4}
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
        onSubmit={
          event => {
            event.preventDefault();
            onSubmit(formJson); // submit data
      }}
      >
        <Typography variant="h5" gutterBottom>
          {formJson.label}
        </Typography>

        {formJson.properties.map((item: any, index: string) => {
          return item.type === "object" ? // when type is object works recursion
            <TypeObject key={"obj"+index} dir={dir+" -> "+item.label} valueHandler={valueHandler} k={k+"."+index} onSubmit={onSubmit} formJson={item} submitButton={false} />
          :
          item.type === "enum" ? // when type is enum (enum component)
            <TypeEnum key={"enum"+index} valueHandler={valueHandler} item={item} k={k+"."+index} />
          : item.type === "array" ? // when type is arrar (array component)
            <TypeArray key={"arr"+index} dir={dir+" -> "+item.label} valueHandler={valueHandler} k={k+"."+index} onSubmit={onSubmit} item={item} />
          : item.type === "number" ?
            <TextField
              key={k+"."+index}
              value={item.value}
              name={item.name}
              label={item.label}
              type={item.type}
              required={item.required}
              inputProps={{
                min: item.minimum,
                max: item.maximum,
              }}
              variant="outlined"
              onChange={(e) => valueHandler(k+"."+index, e.target.value)}
            />
          :
            item.type === "string" && item.name === "phone" ?
            <TextField
              key={k+"."+index}
              value={item.value}
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
              onChange={(e) => valueHandler(k+"."+index, e.target.value)}
            />
          : item.type === "boolean" ?
            <FormControlLabel
              key={k+"."+index}
              value={item.value}
              control={<Checkbox value="no" onChange={(e) => valueHandler(k+"."+index, e.target.checked)} name={item.type} color="primary"/>}
              label={item.label}
              labelPlacement="end"
            />
          : item.type === "string" ?
            <TextField
              key={k+"."+index}
              name={item.name}
              value={item.value}
              label={item.label}
              type={item.inputType}
              required={item.required}
              multiline={item.multiline}
              variant="outlined"
              onChange={(e) => valueHandler(k+"."+index, e.target.value)}
            />
          :
          <Box // when input tupe isn't valid
            pl={2}
            pr={2}
            // pb={4}
            border={1}
            borderColor="grey.400"
            borderRadius={4}
            display="flex"
            flexDirection="column"
            component="div"
          >
            <Typography variant="h5" gutterBottom>
            { <p style={{ color: "red", margin: "0px" }}>Input type error</p>}
            { <p style={{ marginTop: "15px", fontSize: "16px" }}>invalid input type <span style={{ color: "red" }}>"{item.type}"</span> in [<span style={{ color: "green" }}>{dir} - {item.label}</span>] </p>}
            </Typography>
          </Box>
        })}
        {submitButton ?
          <Button style={{ marginTop: "30px" }}
          variant="contained" color="primary" type="submit">
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
