import * as React from "react"
import FileUploader from "./fileUploader"
import VideoProcessor from "./videoProcessor"

export default function App() {
  const [sourceVideoFile, setSourceVideoFile] = React.useState<File | null>(null)
  const reset = () => setSourceVideoFile(null)

  return (
    <>
      <h1>Squishie</h1>
      { !sourceVideoFile
          ? <FileUploader setSourceVideoFile={setSourceVideoFile}/>
          : <VideoProcessor sourceFile={sourceVideoFile} reset={reset} /> }
    </>
  )
}
