import mongoose from "mongoose";

const promptResponsesSchema = new mongoose.Schema(
    {
        parameters: {
            categories: {
                type: [String],
                allowNull: false,
            },
            locations: {
                type: [String],
                allowNull: false,
            },
            numberOfResponses: {
                type: String,
                default: "1x",
                enum: ["1x", "2x", "3x"],
            },
        },
        llmResponse: {
            type: {},
            default: null,
        },
    },
    { timestamps: true },
);

const PromptResponses = new mongoose.model(
    "PromptResponses",
    promptResponsesSchema,
);

export default PromptResponses;
