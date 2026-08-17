import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

  phone: {
  type: String,
  required: true,
  unique: true,
  trim: true,
},

    alternatePhone: {
      type: String,
      default: "",
      trim: true,
    },

    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
      required: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: Boolean,
      default: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
const Customer = mongoose.model(
  "Customer",
  customerSchema
);

export default Customer;