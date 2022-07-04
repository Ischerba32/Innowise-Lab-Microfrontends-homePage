import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import AuthForm from '../../components/AuthForm';
import { auth } from '../../config/firebaseConfig';
import { useTheme } from '../../hooks/useTheme';
import AuthFormParams from '../../interfaces/authForm.interface';

const SignIn = () => {
	const navigate = useNavigate();
	const { theme } = useTheme();

	const [error, setError] = useState('');

	useEffect(() => {
		return onAuthStateChanged(auth, (user) => {
			if (user) navigate('/');
		});
	}, [navigate]);

	useEffect(() => {
		if (error) {
			toast.error(error);
			setError('');
		}
	}, [error]);

	const handleSignIn = async ({ email, password }: AuthFormParams) => {
		try {
			const { user } = await signInWithEmailAndPassword(auth, email, password);
			user && navigate('/');
		} catch (error) {
			setError((error as Error).message);
		}
	};

	return (
		<>
			<AuthForm
				onSubmit={handleSignIn}
				formAction='SignIn'
				actionLink='/signup'
				actionTitle='SignUp'
			/>
			<ToastContainer
				position='top-right'
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme={theme === 'light' ? 'light' : 'dark'}
			/>
		</>
	);
};

export default SignIn;
