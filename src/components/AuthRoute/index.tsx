import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../config/firebaseConfig';
import IUser from '../../interfaces/user.interface';
import { AuthContext } from '../../context/authContext';
import AuthRouteProps from './props';

const AuthRoute = ({ children }: AuthRouteProps) => {
	const [user, setUser] = useState<IUser>({ uid: '', email: '' });

	const navigate = useNavigate();

	useEffect(() => {
		return onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser({
					uid: user.uid,
					email: user?.email,
				});
			} else {
				console.log('Unauthorized');
				setUser({
					uid: '',
					email: '',
				});
				navigate('/signin');
			}
		});
	}, [navigate]);

	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthRoute;
