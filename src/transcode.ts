import { createFFmpeg } from "@ffmpeg/ffmpeg"

// See https://blog.scottlogic.com/2020/11/23/ffmpeg-webassembly.html
export default async function transcode(sourceFile: File, setProgress): Promise<Blob> {
  const ffmpeg = createFFmpeg({
    corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js',
    log: true,
    progress: p => setProgress(p.ratio),
  })

  await ffmpeg.load()
  const sourceBuffer = await sourceFile.arrayBuffer()

  ffmpeg.FS(
    "writeFile",
    sourceFile.name,
    new Uint8Array(sourceBuffer, 0, sourceBuffer.byteLength)
  )

  // See https://unix.stackexchange.com/a/598360
  const targetSizeInMb = 8 // TODO make this user selected
  const targetSize = targetSizeInMb * 1000 * 1000 * 8 // in bits
  const length = Math.ceil(await getVideoLength(sourceFile))
  const totalBitRate = targetSize / length
  const audioBitRate = 128 * 1000
  const videoBitRate = totalBitRate - audioBitRate

  await ffmpeg.run(
    "-i",
    sourceFile.name,
    "-b:v",
    videoBitRate.toString(),
    "-maxrate:v",
    videoBitRate.toString(),
    "-bufsize:v",
    (targetSize / 20).toString(),
    "-b:a",
    audioBitRate.toString(),
    "output.mp4"
  )

  const output = ffmpeg.FS("readFile", "output.mp4")
  
  return new Blob([output], { type: "video/mp4" })
}

// See https://stackoverflow.com/a/29285597
function getVideoLength(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    try {
      const video = document.createElement("video")
      video.preload = "metadata"
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src)
        resolve(video.duration)
      }
      video.src = URL.createObjectURL(file)
    } catch (e: any) {
      reject(e)
    }
  })  
}