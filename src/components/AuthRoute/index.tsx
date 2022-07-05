import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../config/firebaseConfig';
import IUser from '../../interfaces/user.interface';
import { AuthContext } from '../../context/authContext';
import AuthRouteProps from './props';
import { Loader } from '../UI';

const AuthRoute = ({ children }: AuthRouteProps) => {
	const [user, setUser] = useState<IUser>({ uid: '', email: '' });
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		return onAuthStateChanged(auth, (user) => {
			setLoading(true);
			if (user) {
				setUser({
					uid: user.uid,
					email: user?.email,
				});
				setTimeout(() => setLoading(false), 1000);
			} else {
				console.log('Unauthorized');
				setUser({
					uid: '',
					email: '',
				});
				setTimeout(() => {
					navigate('/signin');
					setLoading(false);
				}, 1000);
			}
		});
	}, [navigate]);

	if (loading) return <Loader speed={2} />;

	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthRoute;
