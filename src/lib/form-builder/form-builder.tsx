import { ObjectSchema } from './types'
import {useState} from "react"
import { TypeObject } from './Types/TypeObject';

type Props = {
  setJsonInput: (values: any) => void,
  jsonData: any
  schema: ObjectSchema
  onSubmit: (values: any) => void
}

export const FormBuilder = ({ setJsonInput, jsonData, schema, onSubmit }: Props) => {
  const [country, setCountry] = useState<any>('');
  const handleChange = (value: any) => {
    setCountry(value);
  };

  const [allValues, setAllValues] = useState<any>({});

  const changeHandler = (e: any) => {
    if(e.target.name === "boolean") {
      e.target.checked ? setAllValues({ ...allValues, [e.target.id]: "yes"})
      : setAllValues({ ...allValues, [e.target.id]: "no"})
    } else if(e.target.type === "enum") setAllValues({ ...allValues, [e.target.id]: e.target.value });
    else setAllValues({ ...allValues, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    console.log(allValues);

    e.preventDefault();
    alert("წარმატებით დაემატა!");
    // props.history.push("/admin/sport");
  };

  let formJson = {};
  try {
    formJson = JSON.parse(jsonData);
  } catch(error) {
    console.log("error is" + error);
  }

  let k = "";

  const valueHandler = (index: any, value: any) => {
    let objIndex = index.substring(1);
    const myArr = objIndex.split(".");

    // let TMP = formJson["properties"];
    // for(let i=0; i<myArr.length; i++) {
    //   TMP = TMP[parseInt(myArr[i])].item.properties[i];
    // }

    // console.log("item = ", formJson["properties"][parseInt(myArr[0])]);
    // console.log("item = ", TMP.name);

    console.log("arr = ", myArr);
    console.log("index = ", objIndex);
    console.log("value = ", value);
  }
  return (
    <TypeObject k={k} valueHandler={valueHandler}  setJsonInput={setJsonInput} onSubmit={onSubmit} formJson={formJson} changeHandler={changeHandler} handleSubmit={handleSubmit} allValues={allValues} submitButton={true} /> // Whole object
  )
}
