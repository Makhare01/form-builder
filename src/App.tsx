import { FormBuilder } from 'lib/form-builder'
import { useState } from 'react'
import { Layout } from 'Layout'
import { studentProfileSchema } from 'schemas/student-profile'
import { ResultDialog } from 'ResultDialog'
import studentProfileSchemaJson from 'schemas/student-profile.json'

// Firebase
import firebase from "./utils/firebase";

export const App = () => {
  const [submittedData, setSubmittedData] = useState<any>(null)

  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(studentProfileSchemaJson, null, 2),
  )

  let TMPArr: any = [];
  const GenerateJson = (JSON: any, myJson: any) => {
    let PROP = "";
    if (JSON.type === "object") PROP = "properties";
    else if (JSON.type === "array") PROP = "item";



    JSON[PROP].map((prop: any) => {
      if(prop.type === "string" || prop.type === "number" || prop.type === "boolean" || prop.type === "enum") {
        if(prop.value !== undefined) myJson[prop.name] = prop.value;
        else if (prop.value === undefined && prop.type === "boolean") myJson[prop.name] = "no";
        else myJson[prop.name] = null;
      }
      else if(prop.type === "object") {
        let TMP = {};
        GenerateJson(prop, TMP);

        if(JSON.type === "object") myJson[prop.name] = TMP;
        else if (JSON.type === "array") TMPArr = [...TMPArr, TMP]
      }
      else if(prop.type === "array") {
        TMPArr = [];
        let TMP1 = {};
        GenerateJson(prop, TMP1);
        myJson[prop.name] = TMPArr;
      }
    })

    return myJson;
  }

  return (
    <Layout
      jsonInput={jsonInput}
      setJsonInput={setJsonInput}
      render={jsonInput => {
        // `jsonInput` is a raw string. You need to convert it to the object of `ObjectSchema` type.
        // There are two types of validations that must take place:
        // 1. Check that `jsonInput` is a valid json.
        // 2. Check that it matches the schema described by the `ObjectSchema` type.
        //    This step is called "Runtime data validation".

        // Replace hardcoded `studentProfileSchema` with the parsed `jsonInput`.
        return (
          <>
            <FormBuilder
              jsonData={jsonInput}
              schema={studentProfileSchema}
              setJsonInput={setJsonInput}
              onSubmit={values => {
                let OBJECT = {};
                const Json = GenerateJson(values, OBJECT);
                console.log("json: ", Json)
                setSubmittedData(Json)
                // Send data to Firestore here.
                // if(!alert('Alert For your User!')){window.location.reload();}
                const formRef = firebase.database().ref("Form");
                formRef.push(Json);
              }}
            />

            <ResultDialog
              data={submittedData}
              onClose={() => setSubmittedData(null)}
            />
          </>
        )
      }}
    />
  )
}
