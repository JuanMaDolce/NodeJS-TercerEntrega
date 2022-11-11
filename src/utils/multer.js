import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/public')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${req.body.username}.png`)
    }
  })
  
  const upload = multer({ storage: storage })

  export default upload