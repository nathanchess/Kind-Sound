const { Configuration, OpenAIApi } = require('openai');
const analyzeText = async (message, apiKey) => {
    /* returns true is the message is positive and false is the message is negative */
    const configuration = new Configuration({
        apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
        model: "text-curie-001",
        prompt: `Decide if the sentiment of this message is positive, neutral, or negative:${message}`,
        temperature: 0,
        max_tokens: 1000,
    });

    const text = response.data.choices[0].text;
    return text.includes('positive');
}

module.exports = analyzeText;

