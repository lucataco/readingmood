const generateAction = async (req, res) => {
    const input = JSON.parse(req.body).input;
    console.log("--generate api--")
    console.log(input)

    const response = await fetch("https://api.openai.com/v1/completions", {
        body: 
        '{\n "model": "text-davinci-003",\n  "prompt": "Given a book Title, return a json block with a Theme property for the theme of the book, and a property for the Mood of the book. Also add a Songs property that contains a list of 5 songs that relate to both the Theme and the Mood. Title:' +
        input + '. JSON:",\n  "max_tokens": 256,\n  "temperature": 0.7\n}',
        headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
        },
        method: 'POST',
    })
    .catch((e) => {
        console.log(e)
        res.status(response.status).json({ error: response.statusText });
    });
    console.log(response.body)

    if (response.ok) {
        res.status(200).json(response.json());
    }
};

export default generateAction;