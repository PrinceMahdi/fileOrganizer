// You can add or remove files types and configure it to your liking
export const fileTypes: {
  [key: string]: string[] | { [key: string]: string[] };
} = {
  images: {
    png: [".png"],
    jpg: [".jpg", ".jpeg"],
    svg: [".svg"],
    webp: [".webp"],
    gif: [".gif"],
    bmp: [".bmp"],
    tiff: [".tiff", ".tif"],
  },
  videos: [".mp4", ".avi", ".mkv", ".flv", ".mov"],
  audios: [".mp3", ".wav", ".m4a", ".flac"],
  powerpoints: [".pptx", ".ppt"],
  excel_documents: [".xlsx", ".xls", ".csv"],
  pdf: [".pdf"],
  word_documents: [".docx", ".doc"],
  text_documents: {
    text: [".txt"],
    csv: [".csv"],
    md: [".md"],
    rtf: [".rtf"],
    json: [".json"],
    xml: [".xml"],
  },
  zip: [".zip", ".rar", ".tar", ".gz"],
  code: {
    javascript: [".js", ".jsx"],
    typescript: [".ts", ".tsx"],
    python: [".py"],
    java: [".java"],
    c: [".c"],
    cpp: [".cpp"],
    html: [".html"],
    css: [".css"],
    scss: [".scss"],
    less: [".less"],
  },
};
