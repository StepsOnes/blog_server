import Post from "../models/Post.js";
import User from "../models/User.js";


class PostController {
    async addPost(req, res) {
        try {
            const {title, text, imgUrl} = req.body
            const user = await User.findOne( { _id: req.userId } )

            const post = await new Post({
                title,
                text,
                imgUrl,
                author: user.username
            })

            await post.save()
            await User.findByIdAndUpdate( req.userId, {
                $push: { posts: post }
            })


            res.json({message: 'Пост успешно создан', user  })
        } catch (err) {
            console.log(err)
            res.status(500).json({message: "Ошибка при создании поста"})
        }
    }

    async getAllPosts(req, res) {
        try {
            const posts = await Post.find({})

            res.json({message: "Данные успешно получены", posts})
        } catch (err) {
            console.log(err)
            res.status(500).json({message: "Ошибка при запросе постов"})
        }
    }

    async getOnePost(req, res) {
        try {
            const postId = req.params.id
            const post = await Post.findOne({_id: postId})

            res.json({message: "Пост успешно найден", post})
        } catch (err) {
            console.log(err)
            res.status(500).json({message: "Ошибка при запросе поста"})
        }
    }
}

export default new PostController()