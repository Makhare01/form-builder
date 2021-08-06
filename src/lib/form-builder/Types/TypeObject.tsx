import {useEffect} from "react";
import { Paper, Box, Typography, TextField, FormControlLabel, Checkbox, Button  } from '@material-ui/core'
import { TypeEnum } from './TypeEnum';
import { TypeArray } from './TypeArray';


type Props = {
  setJsonInput: (values: any) => void,
  valueHandler: (k: string, values: any) => void,
  k: string,
  onSubmit: (values: any) => void,
  formJson: any,
  submitButton: boolean,
}

export const TypeObject = ({k, valueHandler, setJsonInput, onSubmit, formJson, submitButton}: Props) => {

  return(
    <Paper style={{ marginBottom: "30px" }}>
    {typeof(formJson) !== "undefined" ?
      formJson.type !== "object" ?
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
            onSubmit(formJson);
            // handleSubmit
      }}
      >
        <Typography variant="h5" gutterBottom>
          {formJson.label}
        </Typography>

        {formJson.properties.map((item: any, index: string) => {
          return item.type === "object" ?
            <TypeObject key={"obj"+index} valueHandler={valueHandler} setJsonInput={setJsonInput} k={k+"."+index} onSubmit={onSubmit} formJson={item} submitButton={false} />
          :
          item.type === "enum" ?
            <TypeEnum key={"enum"+index} valueHandler={valueHandler} item={item} k={k+"."+index} />
          : item.type === "array" ?
            <TypeArray key={"arr"+index} valueHandler={valueHandler} setJsonInput={setJsonInput} k={k+"."+index} onSubmit={onSubmit} formJson={formJson} item={item} />
          : item.type === "number" ?
          <>
            <TextField
              key={"number"+index}
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
          </>
          :
            item.type === "string" && item.name === "phone" ?
            <TextField
              key={"string"+index}
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
              key={"boolean"+index}
              control={<Checkbox value="no" onChange={(e) => valueHandler(k+"."+index, e.target.checked)} name={item.type} color="primary"/>}
              label={item.label}
              labelPlacement="end"
            />
          :
            <TextField
              key={"input"+index}
              name={item.name}
              label={item.label}
              type={item.type}
              required={item.required}
              multiline={item.multiline}
              variant="outlined"
              onChange={(e) => valueHandler(k+"."+index, e.target.value)}
            />
        })}
        {submitButton ?
          <Button style={{ marginTop: "30px" }}
          onClick={() => {
            onSubmit(formJson);
          }}
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
