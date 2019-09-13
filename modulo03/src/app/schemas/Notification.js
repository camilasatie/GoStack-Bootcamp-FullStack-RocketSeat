import mongoose from 'mongoose';

const NoficationSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
    },
    user: {
      type: Number,
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Nofication', NoficationSchema);
