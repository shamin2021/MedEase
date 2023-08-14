import { ChatEngine, getOrCreateChat } from 'react-chat-engine'
import React, { useState } from 'react'

import LoginForm  from '../pages/Login'

import DoctorSideBar from './Doctor/DoctorSideBar'



import '../styles/Chat.css';
import { GridItem } from '@chakra-ui/react';

const DirectChatPage = () => {

	// localStorage.removeItem('username')
	// localStorage.removeItem('password')

	const [username, setUsername] = useState('')
	//if(!localStorage.getItem('username')) return <LoginForm/>
	// Check if the user credentials are available in local storage.
	// const storedUsername = localStorage.getItem('username');
	// const storedPassword = localStorage.getItem('password');
	// const isLoggedIn = storedUsername && storedPassword;

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
					Create
				</button>
			</div>
		)
	}

	return (
		<GridItem colSpan={6}>
      {/* {isLoggedIn ? ( */}
		<ChatEngine 
			height='80vh'   //change window height
			width='300px'
			// userName='oshani'
			// userSecret='oshani'
			// userName={localStorage.getItem('username')}
            // userSecret={localStorage.getItem('password')}
			userName="oshani"
            userSecret="Oshani@123"
			projectID='d9ef1868-1085-4ef0-bd6c-36276738e453'
			renderNewChatForm={(creds) => renderNewChatForm(creds)}
		/>

		{/* ) : (
			<LoginForm />
		  )} */}
		</GridItem>
		
	)

	
}

export default DirectChatPage;