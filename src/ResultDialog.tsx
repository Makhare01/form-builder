import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import ReactJson from 'react-json-view'

type Props = {
  data: object | null
  onClose: () => void
}

export const ResultDialog = (props: Props) => {
  return (
    <Dialog
      open={props.data !== null}
      maxWidth="sm"
      fullWidth
      onClose={props.onClose}
    >
      <DialogTitle>Submitted form</DialogTitle>
      <DialogContent>
        {props.data !== null && (
          <ReactJson
            src={props.data}
            displayDataTypes={false}
            displayObjectSize={false}
            enableClipboard={false}
            name={null}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
