import axios from 'axios';
import { ChatEngine, getOrCreateChat } from 'react-chat-engine'
import React, { useEffect, useState } from 'react'
import useAuth from "../hooks/useAuth";
import { useLocation } from "react-router-dom";

import '../styles/Chat.css';
import { GridItem } from '@chakra-ui/react';


const DirectChatPage = () => {

	const { auth, setAuth } = useAuth();
	const [username, setUsername] = useState('')
	const [navSize, changeNavSize] = React.useState("large");
	const location = useLocation();

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const doctorName = searchParams.get("doctor");
		if (doctorName) {
			setUsername(doctorName);
		}
	}, [location.search]);

	const data = {
		"username": auth.first_name,
		"secret": auth.first_name
	};


	const config = {
		method: 'post',
		url: 'https://api.chatengine.io/users/',
		headers: {
			'PRIVATE-KEY': '622f63df-f884-44d8-af01-b9b779105fe8'
		},
		data: data
	};

	axios(config)
		.then(function (response) {
			console.log(JSON.stringify(response.data));
		})
		.catch(function (error) {
			console.log(error);
		});

	function createDirectChat(creds) {
		getOrCreateChat(
			creds,
			{ is_direct_chat: true, usernames: [username] },
			() => setUsername('')
		)
	}

	function renderNewChatForm(creds) {
		return (
			<div className='divnewchat' >
				<input className="inputnewchat"
					placeholder='Username'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<button className="buttonnewchat" onClick={() => createDirectChat(creds)}>
					CHAT
				</button>
			</div>
		)
	}

	function renderIceBreaker(chat) {
		return (
			<div>

			</div>
		);
	}

	return (
		<GridItem colSpan={6}>
			<div className="ml-[30px] h-screen bg-primary mt-[7.5%]">
				<ChatEngine
					height='80vh'
					width={navSize === "small" ? "calc(100% - 500px)" : "calc(100% - 300px)"}
					userName={auth.first_name}
					userSecret={auth.first_name}
					projectID='2a25bbf3-f598-4cdc-a77f-ba70e11f7609'
					renderNewChatForm={(creds) => renderNewChatForm(creds)}
					renderIceBreaker={renderIceBreaker}
				/>
			</div>

		</GridItem >

	)

}

export default DirectChatPage;