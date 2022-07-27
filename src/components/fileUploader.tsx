import * as React from "react"

interface Props {
  setSourceVideoFile: (file: File) => void
}

export default function FileUploader({ setSourceVideoFile }: Props) {
  // File inputs are always uncontrolled inputs in React
  // https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
  const fileInput = React.createRef<HTMLInputElement>()

  function submit(event: React.FormEvent) {
    event.preventDefault();

    if (
      !fileInput.current
      || !fileInput.current.files
    ) {
      throw new Error("No file selected")
    }
    const file = fileInput.current.files.item(0)

    if (!file) {
      throw new Error("No file selected")
    }
    
    console.log("Video file uploaded: ", file.name)
    setSourceVideoFile(file)
  }

  return (
    <form onSubmit={submit}>
      <label>
        Video to compress:
        <input
          type="file"
          id="fileUpload"
          ref={fileInput}
          accept="video/mp4,video/x-m4v,video/*" // Safari apparently gets confused by just 'video/*'
          required
        />
      </label>      
      <input type="submit" value="Squish" />
    </form>
  )
}
