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
  handleSubmit: (values: any) => void,
  changeHandler: (values: any) => void,
  allValues: any,
  submitButton: boolean,
}

export const TypeObject = ({k, valueHandler, setJsonInput, onSubmit, formJson, handleSubmit, changeHandler, allValues, submitButton}: Props) => {

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
        id="FORM"
        onSubmit={
        //   event => {
        //   Code here
        //   console.log(allValues);
        // }
        handleSubmit
      }
      >
        <Typography variant="h5" gutterBottom>
          {formJson.label}
        </Typography>

        {formJson.properties.map((item: any, index: string) => {
          return item.type === "object" ?
            <TypeObject valueHandler={valueHandler} setJsonInput={setJsonInput} k={k+"."+index} onSubmit={onSubmit} changeHandler={changeHandler} handleSubmit={handleSubmit} allValues={allValues} formJson={item} submitButton={false} />
          :
          item.type === "enum" ?
            <TypeEnum valueHandler={valueHandler} item={item} allVals={allValues} k={k+"."+index} handleValue={changeHandler} />
          : item.type === "array" ?
            <TypeArray valueHandler={valueHandler} setJsonInput={setJsonInput} k={k+"."+index} onSubmit={onSubmit} formJson={formJson} changeHandler={changeHandler} handleSubmit={handleSubmit} allValues={allValues} item={item} />
          : item.type === "number" ?
          <>
            <TextField
              // id={k}
              className="INPUT"
              name={item.name}
              label={item.label}
              type={item.type}
              required={item.required}
              // value={allValues[item.name]}
              // value={item.value}
              inputProps={{
                min: item.minimum,
                max: item.maximum,
              }}
              variant="outlined"
              // onChange={changeHandler}
              onChange={(e) => valueHandler(k+"."+index, e.target.value)}
            />
          </>
          :
            item.type === "string" && item.name === "phone" ?
            <TextField
              // id={k}
              className="INPUT"
              name={item.name}
              label={item.label}
              type={item.inputType}
              required={item.required}
              // value={allValues[item.name]}
              // value={item.value}
              inputProps={{
                pattern: item.pattern,
                minLength: item.minLength,
                maxLength: item.maxLength,
              }}
              variant="outlined"
              // onChange={changeHandler}
              onChange={(e) => valueHandler(k+"."+index, e.target.value)}
            />
          : item.type === "boolean" ?
            <FormControlLabel
              // value={allValues[item.name]}
              className="INPUT"
              // onChange={(e: any) => {
              //   item.value = e.target.value
              // }}
              control={<Checkbox className="INPUT" onChange={(e) => valueHandler(k+"."+index, e.target.checked)} name={item.type} color="primary"/>}
              label={item.label}
              labelPlacement="end"
            />
          :
            <TextField
              // id={k}
              className="INPUT"
              name={item.name}
              label={item.label}
              type={item.type}
              required={item.required}
              multiline={item.multiline}
              // value={allValues[item.name]}
              // value={item.value}
              variant="outlined"
              // onChange={changeHandler}
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
