import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.min.css';

import AuthRoute from './components/AuthRoute';
import { useTheme } from './hooks/useTheme';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
	useTheme();

	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={
						<AuthRoute>
							<Home />
						</AuthRoute>
					}
				></Route>

				<Route path='/signin' element={<SignIn />}></Route>
				<Route path='/signup' element={<SignUp />}></Route>
			</Routes>
		</Router>
	);
}

export default App;
