import * as React from "react"
import transcode from "../transcode"

interface Props {
  sourceFile: File
  reset: () => void
}

export default function VideoProcessor({ sourceFile, reset }: Props) {
  const [progress, setProgress] = React.useState(0.0)
  const [videoUrl, setVideoUrl] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  React.useEffect(() => {
    transcode(sourceFile, setProgress)
      .then(blob => setVideoUrl(URL.createObjectURL(blob)))
      .catch(e => setError(e.message))
  }, [sourceFile])

  if (error) {
    return <article>
      Error: {error}
    </article>
  }

  if (!videoUrl) {
    return (
      <article>
        <label htmlFor="progressBar">Processing {sourceFile.name}...</label>
        <progress id="progressBar" max="1" value={progress}>
          {Math.round(progress * 100)}%
        </progress>
      </article>
    )
  }

  const fileName = `small-${sourceFile.name}`

  return (
    <>
      <article>
        Transcoding complete
        <video controls src={videoUrl} />
        <a href={videoUrl} title={fileName} download={fileName}>Save</a>
        
      </article>
      <button onClick={reset}>Squish another video</button>  
    </>
  )
    
}
