import fs from "fs";
import path from "path";

import { fileTypes } from "./fileTypes";

// Make sure to replace the string with your specific downloads path.
// For MAC users use: "/Users/your_username/Downloads"
// For WINDOWS users use: "C:\\Users\\your_username\\Downloads"
const downloadsPath: string = "/Users/your_username/Downloads";

/**
 * Function to format file name to a standard format
 * It removes special characters and converts to lower case
 *
 * @param filename Original filename
 * @returns Formatted filename
 */
const formatFileName = (filename: string): string => {
  const file = path.parse(filename).name;
  const extension = path.parse(filename).ext;
  const formattedName = file
    .split(/[^a-zA-Z0-9]+/)
    .join("_")
    .toLowerCase();
  return formattedName + extension;
};

// Keep track of files moved
let fileMoveCounter = 0;

/**
 * Function to move files from one location to another
 *
 * @param sourcePath File original location
 * @param destinationPath File destination location
 * @returns Promise that resolves when the file move operation is complete
 */
const moveFile = (
  sourcePath: string,
  destinationPath: string
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    fs.rename(
      sourcePath,
      destinationPath,
      (err: NodeJS.ErrnoException | null) => {
        if (err) {
          console.error(
            `Error moving file from ${sourcePath} to ${destinationPath}:`,
            err
          );
          reject(err);
        } else {
          fileMoveCounter++;
          resolve();
        }
      }
    );
  });
};

/**
 * Function to organize files in the download folder
 * It reads the directory and for each file, it checks
 * whether it is a directory itself, whether it is already sorted, or whether
 * it needs to be moved to another folder based on its file extension.
 */
const organizeFiles = () => {
  fs.readdir(
    downloadsPath,
    async (err: NodeJS.ErrnoException | null, files: string[]) => {
      if (err) {
        console.error("Error reading Downloads folder:", err);
        return;
      }

      let movePromises: Promise<void>[] = [];

      // Iterate over each file in the downloads directory
      files.forEach((file: string) => {
        const currentPath = path.join(downloadsPath, file);
        const stats = fs.lstatSync(currentPath);

        // If file is a directory itself or already sorted, skip to next file
        if (file === "everything_else" || file in fileTypes) {
          return;
        }

        // If it's a directory, move it to the "everything_else" folder
        if (stats.isDirectory()) {
          const destinationFolder = path.join(downloadsPath, "everything_else");
          if (!fs.existsSync(destinationFolder)) {
            fs.mkdirSync(destinationFolder, { recursive: true });
          }
          const destinationPath = path.join(destinationFolder, file);
          if (!fs.existsSync(destinationPath)) {
            movePromises.push(moveFile(currentPath, destinationPath));
          }
          return;
        }

        // Extract the file extension
        const extension = path.extname(file).toLowerCase();

        let moved = false;

        // Iterate over each file type and check if file belongs to it
        for (const [folder, content] of Object.entries(fileTypes)) {
          if (Array.isArray(content)) {
            if (content.includes(extension)) {
              const destinationFolder = path.join(downloadsPath, folder);
              if (!fs.existsSync(destinationFolder)) {
                fs.mkdirSync(destinationFolder, { recursive: true });
              }
              const destinationPath = path.join(
                destinationFolder,
                formatFileName(file)
              );
              if (!fs.existsSync(destinationPath)) {
                movePromises.push(moveFile(currentPath, destinationPath));
                moved = true;
              }
              break;
            }
          } else {
            for (const [subFolder, subExtensions] of Object.entries(
              content as { [key: string]: string[] }
            )) {
              if (subExtensions.includes(extension)) {
                const destinationFolder = path.join(
                  downloadsPath,
                  folder,
                  subFolder
                );
                if (!fs.existsSync(destinationFolder)) {
                  fs.mkdirSync(destinationFolder, { recursive: true });
                }
                const destinationPath = path.join(
                  destinationFolder,
                  formatFileName(file)
                );
                if (!fs.existsSync(destinationPath)) {
                  movePromises.push(moveFile(currentPath, destinationPath));
                  moved = true;
                }
                break;
              }
            }
          }

          if (moved) {
            break;
          }
        }

        // If file does not match any type, move it to the "everything_else" folder
        if (!moved) {
          const destinationFolder = path.join(downloadsPath, "everything_else");
          if (!fs.existsSync(destinationFolder)) {
            fs.mkdirSync(destinationFolder, { recursive: true });
          }
          const destinationPath = path.join(
            destinationFolder,
            formatFileName(file)
          );
          if (!fs.existsSync(destinationPath)) {
            movePromises.push(moveFile(currentPath, destinationPath));
          }
        }
      });

      await Promise.all(movePromises);
      console.log(`Total number of files moved: ${fileMoveCounter}`);
    }
  );
};

// Start the organization process
organizeFiles();
