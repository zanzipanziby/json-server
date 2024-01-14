import React, {useEffect, useState} from 'react';
import axios, {AxiosError} from "axios";
import {toast} from "react-toastify";
import {postAPI} from "./api";

export type PostType = {
	userId: number
	id: number
	title: string
	body: string
}



export const Posts = () => {
	const [posts, setPosts] = useState<Array<PostType>>([])
	const [newTitle, setNewTitle] = useState('')

	const fetchPosts = () => {
		postAPI.getPosts().then(res => setPosts(res.data))
	}
	useEffect(() => {
		fetchPosts()
	}, []);

	const deletePost = (id: number) => {
		postAPI.deletePost(id).then(() => {
			setPosts(posts.filter(el => el.id !== id))
		})
	}
	const addNewPost = () => {
		const newPost = {
			userId: 4,
			id: Math.floor(Math.random() * 25 * Math.random() * 14),
			title: newTitle,
			body: 'Body'
		}
		axios.post('https://jsonplaceholder.typicode.com/posts', newPost)
			.then(res => res.data)
			.then(() => setPosts([newPost, ...posts]))
			.catch((res: AxiosError) => {
				toast.error(res.message)
			})

	}


	return (
		<div style={{textAlign: "center"}}>
			<h1>POSTS</h1>
			<input
				type="text"
				value={newTitle}
				onChange={e => setNewTitle(e.currentTarget.value)}
				onKeyDown={e => e.key === 'Enter' && addNewPost()}
			/>
			<ul>
				{posts?.map(el => {
					return <li key={el.id}>
						<h3>{el.id}. {el.title.toUpperCase()}</h3>
						<p>{el.body}</p>
						<button onClick={() => deletePost(el.id)}>DELETE POST</button>
						<hr/>
					</li>
				})}
			</ul>
		</div>
	);
};

