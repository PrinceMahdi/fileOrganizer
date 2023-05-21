# Downloads Folder File Sorter

The Downloads Folder File Sorter is a Node.js script that automatically organizes your downloads folder by sorting files into their respective directories based on their file types. It also renames all files using the snake_case naming convention. 

## Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- TypeScript

```bash
npm i -g typescipt
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/PrinceMahdi/fileOrganizer.git
cd fileOrganizer
```

Open the **index.ts** file in your preferred text editor.

Replace the following with your actual downloads folder path:

```bash
const downloadsPath: string = "YOUR_DOWNLOADS_PATH_GOES_HERE";
```

For macOS users, it would be something like **"/Users/your_username/Downloads"**

For Windows users, it would be something like **"C:\\Users\\your_username\\Downloads"**

## Usage

To run the script, simply type the following command in your terminal:

```bash
npm start
```

This will organize your files in your downloads folder according to their extension and rename them accordingly.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
