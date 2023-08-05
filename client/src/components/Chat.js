import { ChatEngine, getOrCreateChat } from 'react-chat-engine'
import React, { useState } from 'react'

import LoginForm  from '../pages/Login'


import '../styles/Chat.css';

const DirectChatPage = () => {

	// localStorage.removeItem('username')
	// localStorage.removeItem('password')

	const [username, setUsername] = useState('')
	//if(!localStorage.getItem('username')) return <LoginForm/>
	// Check if the user credentials are available in local storage.
	const storedUsername = localStorage.getItem('username');
	const storedPassword = localStorage.getItem('password');
	const isLoggedIn = storedUsername && storedPassword;

	function createDirectChat(creds) {
		getOrCreateChat(
			creds,
			{ is_direct_chat: true, usernames: [username] },
			() => setUsername('')
		)
	}

	function renderNewChatForm(creds) {
		return (
			<div className='divnewchat'>
				<input className="inputnewchat"
					placeholder='Username' 
					value={username} 
					onChange={(e) => setUsername(e.target.value)} 
				/>
				<button className="buttonnewchat" onClick={() => createDirectChat(creds)}>
					Create
				</button>
			</div>
		)
	}

	return (
		<>
      {isLoggedIn ? (
		<ChatEngine 
			height='100vh'   //change window height
			width='300px'
			// userName='oshani'
			// userSecret='oshani'
			userName={localStorage.getItem('username')}
            userSecret={localStorage.getItem('password')}
			projectID='9d8045a0-a0b6-4bb5-a31e-dfc440dde62f'
			renderNewChatForm={(creds) => renderNewChatForm(creds)}
		/>

		) : (
			<LoginForm />
		  )}
		</>
	)

	
}

export default DirectChatPage;