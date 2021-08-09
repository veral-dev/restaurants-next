"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.RestaurantSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    neighborhood: {
        type: String,
    },
    photograph: {
        type: String,
    },
    address: {
        type: String,
    },
    latlng: {
        type: Map,
    },
    image: {
        type: String,
    },
    cuisine_type: {
        type: String,
    },
    operating_hours: {
        type: Map,
    },
    reviews: [{ type: Map }],
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('Restaurant', exports.RestaurantSchema);
//# sourceMappingURL=Restaurant.model.js.map