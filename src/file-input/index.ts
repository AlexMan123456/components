export enum FileType {
  PDF = "application/pdf",
  PNG = "application/png",
  JPEG = "application/jpeg",
  XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  MP3 = "audio/mp3",
  WAV = "audio/wav",
}

export { default as FileInput } from "./FileInput";
export { default as FileInputList } from "./FileInputList";
