import multer from "multer";
import fs from "fs";

const storage = multer({
    storage:multer.memoryStorage(),
    limits:{
        fileSize:1024*1024*5 //5 mb file size 
    }
})

export default storage;