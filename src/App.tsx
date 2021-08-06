import { FormBuilder } from 'lib/form-builder'
import { useState } from 'react'
import { Layout } from 'Layout'
import { studentProfileSchema } from 'schemas/student-profile'
import { ResultDialog } from 'ResultDialog'
import studentProfileSchemaJson from 'schemas/student-profile.json'

export const App = () => {
  const [submittedData, setSubmittedData] = useState<any>(null)
  // console.log(submittedData);

  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(studentProfileSchemaJson, null, 2),
  )

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
                setSubmittedData(values)
                // Send data to Firestore here.
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
