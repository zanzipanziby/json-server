import axios from "axios";
import {PostType} from "./Posts";


const instance = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com/'
})

export const postAPI = {
	getPosts(){
		return instance.get<PostType[]>('posts')
	},
	deletePost(id: number){
		return instance.delete(`posts/${id}`)
	}
}
