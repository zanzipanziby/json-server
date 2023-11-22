import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";

type PostType = {
	userId: number
	id: number
	title: string,
	body: string
}



function App() {
	const [posts, setPosts] = useState<null | PostType[]>(null)
	useEffect(() => {
		axios.get<PostType[]>('https://jsonplaceholder.typicode.com/posts').then((data) => setPosts(data.data))
	}, []);

	const deletePost = (id: number) => {
		axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
			.then(() => posts?.length && setPosts(posts.filter(el => el.id !== id)))
	}


	return (
		<div className="App">
			<h1>POSTS</h1>
			<br/>
			<br/>
			<ul>
				{posts?.map(el => {
					return <li key={el.id}>
						<h3>{el.id}. {el.title.toUpperCase()}</h3>
						<p>{el.body}</p>
						<button onClick={() => deletePost(el.id)}>DELETE</button>
						<hr/>
					</li>
				})}

			</ul>
		</div>
	);
}

export default App;
