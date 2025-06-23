import OpenAI from "openai";
import axios from "axios";
import PromptResponses from "../models/promptResponses.models.js";

const openai = new OpenAI({
    apiKey:
        process.env.OPENAI_API_KEY || "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",
});

const createPrompt = (vendorTypes, locations, excludes) => {
    // The prompt is carefully structured to guide the AI model.
    // 1. It defines the AI's "persona" - an expert research assistant. This sets the context.
    // 2. It clearly lists the search criteria using the parameters received from the frontend.
    // 3. It specifies the desired output format (a JSON array) to ensure the data is structured and easy to parse.
    // 4. It provides an example to eliminate ambiguity.
    return `
        You are an expert research assistant specializing in the construction industry.
        Your task is to find construction vendors based on the following criteria.
        For each vendor you find, you MUST provide the company name and a contact email address. If an email is not publicly available, return null for the email field.

        **Search Criteria:**
        - **Vendor Type:** ${vendorTypes.join(", ")}
        - **Location(s):** ${locations.join(", ")}
        - **excludes:** ${excludes || "None"}

        **Required Output Format:**
        Return your findings as a JSON array of objects. Each object must contain "name" and "email" keys.

        **Example:**
        [
          {
            "name": "Berlin Premium Tiles",
            "email": "contact@berlinpremiumtiles.de"
          },
          {
            "name": "Munich Flooring Solutions",
            "email": "info@munichflooring.com"
          },
          {
            "name": "General Concrete Berlin (Government)",
            "email": null
          }
        ]

        Now, perform a comprehensive web search and provide the results in the specified JSON format.
    `;
};

export const generatePromptResponseGemini = async (req, res) => {
    const { categories, locations, excludeChamberOfGermanyCompanines } =
        req.body;

    try {
        if (
            !categories ||
            !locations ||
            !Array.isArray(locations) ||
            locations.length === 0
        ) {
            return res
                .status(400)
                .json({
                    error: 'Bad Request: Missing or invalid parameters. "vendorTypes" and "locations" (as an array) are required.',
                });
        }

        // Construct the prompt for the Gemini API.
        const prompt = createPrompt(
            categories,
            locations,
            excludeChamberOfGermanyCompanines,
        );
        console.log("--- Generated Prompt for Gemini ---");
        console.log(prompt);
        console.log("------------------------------------");

        // --- Gemini API Request ---
        // Prepare the data payload for the Gemini API.
        const geminiPayload = {
            contents: [
                {
                    parts: [
                        {
                            text: prompt,
                        },
                    ],
                },
            ],
        };

        // Get your Gemini API Key from environment variables.
        const apiKey =
            process.env.GEMINI_API_KEY ||
            "AIzaSyAmEAcaP9rXQUjDLXjCRB16BMknZu1oqS4";
        if (!apiKey) {
            throw new Error(
                "GEMINI_API_KEY is not set in the environment variables.",
            );
        }

        // Construct the API URL.
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        // Make the POST request to the Gemini API using axios.
        console.log("Sending request to Gemini API...");
        const apiResponse = await axios.post(apiUrl, geminiPayload);

        // --- Process the Response ---
        // Extract the text content from the Gemini API's response.
        // The actual content is nested within the response data structure.
        const rawResultText =
            apiResponse.data.candidates[0].content.parts[0].text;

        console.log("--- Raw Response from Gemini ---");
        // The raw response might have markdown backticks (```json ... ```) which need to be removed for parsing.
        const cleanedJsonString = rawResultText
            .replace(/```json\n|```/g, "")
            .trim();
        console.log(cleanedJsonString);
        console.log("---------------------------------");

        const vendors = JSON.parse(cleanedJsonString);
        res.status(200).json(vendors);
    } catch (error) {
        console.error(
            "An error occurred:",
            error.response ? error.response.data : error.message,
        );
        res.status(500).json({
            error: "An internal server error occurred while processing your request.",
        });
    }
};

export const generatePromptResponseChatGpt = async (req, res) => {
    const {
        categories,
        locations,
        excludeChamberOfGermanyCompanines,
        numberOfResponses,
    } = req.body;

    console.log(categories, locations, excludeChamberOfGermanyCompanines, numberOfResponses, "abcd")

    if (
        !Array.isArray(categories) ||
        !Array.isArray(locations)
    ) {
        return res.status(400).json({
            error: "Expected { categories: string[], locations: string[] }",
        });
    }

    let tokens = 1000;
    switch (numberOfResponses) {
        case "1x":
            tokens = 1000;
            break;

        case "2x":
            tokens = 1500;
            break;

        case "3x":
            tokens = 2000;
            break;
    }

    // build the exclusion instruction
    const exclusionInstruction = excludeChamberOfGermanyCompanines
        ? "Exclude any companies that are members of the German Chamber of Commerce."
        : "Do not exclude Chamber members.";

    // build the prompt
    const userPrompt = `
        You are an AI agent with access to the public web.
        Your job is to find as many construction vendors in GERMANY, as you can within the allowed token limit, strictly adhering to these criteria:

        Categories:
        ${categories.map((c) => `- ${c}`).join("\n")}

        Locations (city names):
        ${locations.map((l) => `- ${l}`).join("\n")}

        ${exclusionInstruction}

        Rules:
        1. Only include vendors whose city exactly matches one of the specified Locations
        2. Do not invent locations or include vendors from other cities.
        3. For each vendor include:
            • name
            • email address (publicly listed)
            • location (city, country)
            • sourceUrl (where you found the info)

        Return a single valid JSON array. Each element must have this shape:

        {
        "vendorType": "<one of the input categories>",
        "info": [
            {
            "name": "...",
            "email": "...",
            "location": "...",
            "sourceUrl": "..."
            },
            …
        ]
        }

        Do not wrap the output in markdown or extra text—only the JSON array.
        If you can’t find any email, skip that vendor.
    `;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-search-preview",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a helpful AI agent that can search the public web for vendor contact information.",
                },
                { role: "user", content: userPrompt.trim() },
            ],
            //   temperature: 0.2,
            max_tokens: tokens,
        });

        const raw = completion.choices?.[0]?.message?.content;
        console.log("AI raw output", raw);

        if (!raw) {
            return res.status(502).json({ error: "Bad Gateway" });
        }

        const cleanedLLMResponse = raw.replace(/```json\n|```/g, "").trim();
        const vendors = JSON.parse(cleanedLLMResponse);

        const saveLLMResponse = await PromptResponses.create({
            parameters: {
                categories,
                locations,
                numberOfResponses,
            },
            llmResponse: vendors,
        });

        console.log("response saved", saveLLMResponse);

        let totalEmails = 0;
        for (let vendor of vendors) {
            totalEmails += vendor?.info?.length;
        }

        res.status(200).json({ totalEmails, vendors: saveLLMResponse });
    } catch (error) {
        console.error(
            "promptResponse.controllers - generatePromptResponseChatGpt",
            error,
        );
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
