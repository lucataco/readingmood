const generateAction = async (req, res) => {
    const input = req.body.input;
    const apiKey = process.env.YOUTUBE_API_KEY;
    console.log("--get yt--");
    console.log(input);
  
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${input}&type=video&key=${apiKey}`);
    const json = await response.json();
    console.log(json)
    const videoId = json.items[0].id.videoId;
    const videoLink = `https://www.youtube.com/watch?v=${videoId}`;
    console.log(videoLink);
  
    return res.status(200).json(videoLink);
  };
  
  export default generateAction;
  