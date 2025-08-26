const {Promomodel} = require("../Models/Promo.js");

// Add new video
const addVideo =async(req,res,next)=>{
    try {
    const { title} = req.body;
    const video = req.files;
    const videoUrl = await cloudinaryfileupload(video.path);


    if (!title || !videoUrl) {
      return res.status(400).json({ message: "Title and video URL are required" });
    }

    const newVideo = new Video({ title, videoUrl });
    await newVideo.save();

    fs.unlinkSync(video.path);

    res.status(201).json({ message: "Video added successfully", video: newVideo });
  } catch (error) {
   next(error)
  }
}

// Get all videos
const getvideo = async(req,res,next)=>{
      try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    next(error)
  }
}

const deletevideo = async(req,res,next)=>{
      try {
    const { id } = req.params;

    const deletedVideo = await Video.findByIdAndDelete(id);

    if (!deletedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    next(error)
  }

}

module.exports = {
    addVideo,
    deletevideo,
    getvideo
}
