import * as React from "react"
import FileUploader from "./fileUploader"

export default function App() {
  const [sourceVideoFile, setSourceVideoFile] = React.useState<File | null>(null)

  return (
    <>
      <h1>Squishie</h1>
      <FileUploader setSourceVideoFile={setSourceVideoFile}/>
    </>
  )
}
