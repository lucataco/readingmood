const generateAction = async (req, res) => {
  const input = req.body.input;
  var inputStr =
    "Given a Title of a book, return a json block with a Genre, and Mood property that describes the genre and mood of the given book Title. Also add a Songs property that contains a list of 5 songs that relate to the Genre, and Mood property. Title: " +
    input +
    ". JSON:";
  const inputData = {
    prompt: inputStr,
    max_tokens: 200,
    temperature: 0.7,
  };
  const response = await fetch(
    "https://api.openai.com/v1/engines/text-davinci-003/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(inputData),
    }
  )
  .catch((err) =>{
    console.log(err);
    return res.status(400).json("An error occured, please try again");
  });

  const output = await response.json();
  return res.status(200).json(output);
};

export default generateAction;
