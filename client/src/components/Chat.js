import { ChatEngine, getOrCreateChat } from 'react-chat-engine'
import React, { useState } from 'react'
import useAuth from "../hooks/useAuth";

import '../styles/Chat.css';
import { GridItem } from '@chakra-ui/react';

const DirectChatPage = () => {

	const { auth, setAuth } = useAuth();
	const [username, setUsername] = useState('')

	function createDirectChat(creds) {
		getOrCreateChat(
			creds,
			{ is_direct_chat: true, usernames: [username.toLowerCase()] },
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

		<ChatEngine 
			height='80vh'
			width='300px'
			userName={auth.first_name}
            userSecret={auth.first_name}
			projectID='d9ef1868-1085-4ef0-bd6c-36276738e453'
			renderNewChatForm={(creds) => renderNewChatForm(creds)}

			renderIceBreaker={renderIceBreaker} 
		/>

		</GridItem>
		
	)
	
}

export default DirectChatPage;