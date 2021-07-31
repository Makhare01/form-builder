import {
  Box,
  Button,
  ButtonGroup,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  MuiThemeProvider,
  Paper,
} from '@material-ui/core'
import { ReactNode, useState } from 'react'
import studentProfileSchemaJson from 'schemas/student-profile.json'
import testSchemaJson from 'schemas/test.json'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-json'
import 'prismjs/themes/prism.css'

const theme = createTheme({
  props: {
    MuiTextField: {
      variant: 'outlined',
      margin: 'dense',
    },
    MuiFormControl: {
      variant: 'outlined',
      margin: 'dense',
    },
  },
})

type Props = {
  render: (jsonInput: string) => ReactNode
}

export const Layout = (props: Props) => {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(studentProfileSchemaJson, null, 2),
  )

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box mb={2}>
                <ButtonGroup>
                  <Button
                    onClick={() => {
                      setJsonInput(
                        JSON.stringify(studentProfileSchemaJson, null, 2),
                      )
                    }}
                  >
                    Student
                  </Button>
                  <Button
                    onClick={() => {
                      setJsonInput(JSON.stringify(testSchemaJson, null, 2))
                    }}
                  >
                    Test
                  </Button>
                </ButtonGroup>
              </Box>
              <Paper style={{ overflow: 'auto' }}>
                <Editor
                  value={jsonInput}
                  onValueChange={setJsonInput}
                  highlight={code => highlight(code, languages['json'], 'json')}
                  padding={10}
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 16,
                  }}
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>{props.render(jsonInput)}</Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </MuiThemeProvider>
  )
}
