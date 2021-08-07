import { useState } from "react"
import { ObjectSchema } from './types'
import { TypeObject } from './Types/TypeObject';

type Props = {
  setJsonInput: (values: any) => void,
  jsonData: any
  schema: ObjectSchema
  onSubmit: (values: any) => void
}

export const FormBuilder = ({ setJsonInput, jsonData, onSubmit }: Props) => {
  let formJson: any = {};
  try {
    formJson = JSON.parse(jsonData);
  } catch(error) {
    console.log("error is" + error);
  }

  let k = "";

  const valueHandler = (index: string, value: any) => {
    let objIndex = index.substring(1);
    const myArr = objIndex.split(".");

    let TMP = formJson["properties"][parseInt(myArr[0])];
    for(let i=1; i<myArr.length; i++) {
      if(TMP.type) {
        if(TMP.type === "array") TMP = TMP.item[parseInt(myArr[i])];
        else if (TMP.type === "object") TMP = TMP.properties[parseInt(myArr[i])];
      }
    }

    // let obj2 = { value: value};

    if(TMP.type === "boolean") {
      if(value === true) TMP.value = "yes";
      else TMP.value = "no";
    }
    else TMP.value = value;

    setJsonInput(
      JSON.stringify(formJson, null, 2),
    )
  }



  return (
    <TypeObject k={k} valueHandler={valueHandler} onSubmit={onSubmit} formJson={formJson}   submitButton={true} /> // Whole object
  )
}
