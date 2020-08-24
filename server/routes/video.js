  
const express = require('express');
const router = express.Router();
// const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');

const { Video } = require("../models/Video");
// var storage = multer.diskStorage({
    // filename: (req, file, cb) => {
    //     cb(null, `${Date.now()}_${file.originalname}`)
    // }
    // fileFilter: (req, file, cb) => {
    //     const ext = path.extname(file.originalname)
    //     if (ext !== '.mp4') {
    //         return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
    //     }
    //     cb(null, true)
    // }
// })

// var upload = multer({ storage: storage });

// var cloudinary = require('cloudinary');
// cloudinary.config({ 
//   cloud_name: 'dwvx9infb', 
//   api_key: '226622336934639', 
//   api_secret: 'qAu1e_3s0gmdcRqvbuKmAKvSxoI'
// });

// router.post("/uploadfiles",upload.any(),(req, res) => {
//     console.log("filepathhere",req.files[0].path);
//     cloudinary.v2.uploader.upload_large(req.files[0].path, 
//         { resource_type: "video",
//         eager:[{width:900,height:750,quality:40,crop:"pad",audio_codec:"none"}]},
//                 function(error, result) {
//                     console.log(result, error)
//                     console.log("vbdvbvd",result.eager[0].secure_url);
//                     if(error == undefined){
//                         res.json({success:true,filePath:result.eager[0].secure_url,fileName:res.req.files[0].filename})
//                     }else{
//                         res.json({success:false});
//                     }
//                 });
// });

// router.post("/thumbnail", upload.any(),(req, res) => {
// cloudinary.v2.uploader.upload(req.files[0].path,function(error,result){
//     if(error == undefined){
//         res.json({success:true,filePath:result.secure_url,fileName:res.req.files[0].filename})
//     }else{
//         res.json({success:false});
//     }
// })



// });

router.post("/uploadVideo", (req, res) => {

    const video = new Video(req.body)

    video.save((err, video) => {
        if(err) return res.status(400).json({ success: false, err })
        return res.status(200).json({
            success: true 
        })
    })

});


router.get("/getVideos", (req, res) => {

    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos })
        })

});

router.post("/getVideo", (req, res) => {

    Video.findOne({ "_id" : req.body.videoId })
    .populate('writer')
    .exec((err, video) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, video })
    })
});

router.post("/getUserVideos", (req, res) => {

    Video.find({ writer : req.body.userId })
    .populate('writer')
    .exec((err, videos) => {
        if(err) return res.status(400).send(err);
        console.log(videos);
        res.status(200).json({ success: true, videos })
    })
});


module.exports = router;