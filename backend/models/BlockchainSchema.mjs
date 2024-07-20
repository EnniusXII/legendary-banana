import mongoose from "mongoose";

const blockchainSchema = new mongoose.Schema({
    chain: [
        {
            timestamp: Date,
            lastHash: String,
            hash: String,
            data: Array,
            nonce: Number,
            difficulty: Number
        }
    ]
});

export default mongoose.model("BlockchainDb", blockchainSchema);