import {Storage} from "@google-cloud/storage"
import expressAsyncHandler from "express-async-handler";
import fs from "fs"
import processFileMiddleware from "../middleware/processFileMiddleware.js";

const storageKey = JSON.parse(fs.readFileSync("backend/keys/storage-key.json", "utf-8"))

const storage = new Storage({projectId: storageKey.project_id, credentials: storageKey})
const bucketName = "product-images-protechgear"
const bucket = storage.bucket(bucketName)

const getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;

// @desc:   Upload file to GCS
// @route:  POST /api/upload
// @access: Private/admin
export const upload = expressAsyncHandler(async (req, res) => {
    try { 
      
        try {
            await processFileMiddleware(req, res)
     
        } catch (error) {
            throw error       
        }
        const gcsFileName = `${Date.now()}-${req.file.originalname}`;
        const file = bucket.file(gcsFileName)
        const stream = file.createWriteStream({metadata: {
            contentType: req.file.mimetype,
        }})

        stream.on('error', (err) => {
            req.file.cloudStorageError = err;
            throw err;
        });

        stream.on("finish", async() => {
            req.file.cloudStorageObject = gcsFileName

            return file.makePublic()
                .then(() => {
                    const publicUrl = getPublicUrl(bucketName, gcsFileName)
                    req.file.gcsUrl = publicUrl
                    res.send(publicUrl)
                }).catch(err => {
                    throw err
                })
        })

        stream.end(req.file.buffer);

    } catch (error) {
        if (error.code == "LIMIT_FILE_SIZE") {
            throw new Error("File size cannot be larger than 20MB!")
        }
        throw error
    }
})