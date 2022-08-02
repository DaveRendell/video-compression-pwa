import * as React from "react"
import FileUploader from "./fileUploader"
import VideoProcessor from "./videoProcessor"

export default function App() {
  const [sourceVideoFile, setSourceVideoFile] = React.useState<File | null>(null)
  const reset = () => setSourceVideoFile(null)

  return (
    <main>
      <h1>Squishie</h1>
      Squishes videos down to less than 8MB, to get around a certain messaging app's
      file restrictions.
      <br/>
      All processing is done on your device, your videos won't
      get sent to any servers.
      { !sourceVideoFile
          ? <FileUploader setSourceVideoFile={setSourceVideoFile}/>
          : <VideoProcessor sourceFile={sourceVideoFile} reset={reset} /> }
    </main>
  )
}
