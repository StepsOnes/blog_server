import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
    {
       title: {
           type: String,
           required: true
       },
        text: {
            type: String,
            required: true
        },
        imgUrl: {
           type: String,
            default: ''
        },
        views: {
           type: Number,
            default: 0
        },
        author: {
           type: String,
        }
    },
    { timestamps: true },
)

export default mongoose.model('Post', PostSchema)