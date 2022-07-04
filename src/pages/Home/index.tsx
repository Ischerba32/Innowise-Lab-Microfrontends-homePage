import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Greeting from '../../components/Greeting';
import { Header } from '../../components/Header';
import { Button, Card, Htag } from '../../components/UI';
import { auth } from '../../config/firebaseConfig';

const Home = () => {
	const navigate = useNavigate();

	const handleClickButton = () => {
		signOut(auth);
		navigate('/signin');
	};

	return (
		<>
			<Header />
			<Greeting />
		</>
	);
};

export default Home;
