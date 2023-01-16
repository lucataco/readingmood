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
  );

  const output = await response.json();
  const ret = output.choices[0].text.trim();
  const test = JSON.parse(ret);
  return res.status(200).json(test);
};

export default generateAction;
