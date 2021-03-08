const Fs = require("fs");
const Path = require("path");
const uuidv1 = require("uuidv1");
const db = require("../models/index");
const imageThumbnail = require("image-thumbnail");

const makeDirectory = (path) => {
  return new Promise(async (resolve, reject) => {
    Fs.mkdir(path, { recursive: true }, (err) => {
      if (err) {
        return resolve(true);
      } else {
        return resolve(true);
      }
    });
  });
};

// Method to write file at destination directory
const writeFile = (destination, filename, data) => {
  return new Promise(async (resolve, reject) => {
    await Fs.writeFile(destination + "/" + filename, data, (err) => {
      if (err) {
        return reject(false);
      }
      return resolve(true);
    });
  });
};

// Method to fetch file details
const fileStats = (destination, filename) => {
  return new Promise(async (resolve, reject) => {
    await Fs.stat(destination + "/" + filename, (err, stats) => {
      if (err) {
        return reject(false);
      }
      return resolve(stats);
    });
  });
};

exports.handleFileUpload = async (file) => {
  return new Promise(async (resolve, reject) => {
    const UTCDate = new Date();
    const year = UTCDate.getUTCFullYear();
    const month = UTCDate.getUTCMonth();
    const day = UTCDate.getUTCDate();
    const hour = UTCDate.getUTCHours();
    let destination = "resources/attachments";
    let thumbnailDestination = "resources/attachments/thumbnail";
    let makeDir = await makeDirectory(destination);
    let thumbDir = await makeDirectory(thumbnailDestination);
    destination = destination + "/" + year;
    thumbnailDestination = thumbnailDestination + "/" + year;
    makeDir = await makeDirectory(destination);
    thumbDir = await makeDirectory(thumbnailDestination);
    destination = destination + "/" + month;
    thumbnailDestination = thumbnailDestination + "/" + month;
    makeDir = await makeDirectory(destination);
    thumbDir = await makeDirectory(thumbnailDestination);
    destination = destination + "/" + day;
    thumbnailDestination = thumbnailDestination + "/" + day;
    makeDir = await makeDirectory(destination);
    thumbDir = await makeDirectory(thumbnailDestination);
    destination = destination + "/" + hour;
    thumbnailDestination = thumbnailDestination + "/" + hour;
    makeDir = await makeDirectory(destination);
    thumbDir = await makeDirectory(thumbnailDestination);
    if (makeDir && thumbDir) {
      if (file.payload.filename instanceof Array) {
        let uploadedfiles = [];
        for (const fileIndex of file.payload.filename) {
          const filename = fileIndex.hapi.filename;
          const extension = Path.extname(filename);
          const uniqueName = uuidv1() + extension;
          const data = fileIndex._data;

          let fileData = await writeFile(destination, uniqueName, data);
          let thumbName = await imageThumbnail(destination + "/" + uniqueName);
          let thumbData = await writeFile(
            thumbnailDestination,
            uniqueName,
            thumbName
          );
          let stats = await fileStats(destination, uniqueName);
          if (fileData) {
            let stats = await fileStats(destination, uniqueName);
            if (filename !== "") {
              uploadedfiles.push({
                originalName: filename,
                uniqueName: uniqueName,
                filePath: destination + "/" + uniqueName,
                size: stats.size,
                extension: extension,
              });
              const attachmentData = await db.AttachmentFile.create({
                Size: stats.size,
                FileName: filename,
                UniqueName: uniqueName,
                FilePath: destination + "/" + uniqueName,
                ThumbPath: thumbnailDestination + "/" + uniqueName,
                Ext: extension.slice(1, extension.length),
              });
            }
          }
        }
        return resolve(uploadedfiles);
      } else {
        const filename = file.payload.filename.hapi.filename;
        const extension = Path.extname(filename);
        const uniqueName = uuidv1() + extension;
        const data = file.payload.filename._data;
        let fileData = await writeFile(destination, uniqueName, data);

        let thumbName = await imageThumbnail(destination + "/" + uniqueName);
        let thumbData = await writeFile(
          thumbnailDestination,
          uniqueName,
          thumbName
        );
        if (file.payload.filename.hapi.filename !== "") {
          if (fileData) {
            let stats = await fileStats(destination, uniqueName);
            const attachmentData = await db.AttachmentFile.create({
              Size: stats.size,
              FileName: filename,
              UniqueName: uniqueName,
              FilePath: destination + "/" + uniqueName,
              ThumbPath: thumbnailDestination + "/" + uniqueName,
              Ext: extension.slice(1, extension.length),
            });
            return resolve({
              originalName: filename,
              uniqueName: uniqueName,
              filePath: destination + "/" + uniqueName,
              thumbPath: thumbnailDestination + "/" + uniqueName,
              size: stats.size,
              extension: extension,
            });
          }
        }
        return resolve("no file selected");
      }
    }
  });
};
