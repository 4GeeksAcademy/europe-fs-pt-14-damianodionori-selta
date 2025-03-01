const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			accessToken: null,
			isLoggedIn: false,
		},
		actions: {
			signup: async (User) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(User),
					});
			
					if (!response.ok) {
						const errorData = await response.json().catch(() => ({}));
						console.error('Signup failed:', errorData);
						setStore({ message: errorData.error || 'Signup failed. Please try again.' });
					} else {
						const data = await response.json().catch(() => ({}));
						const successMessage = data.success || 'Signup successful';
						setStore({ message: successMessage });
						//always return something
						return successMessage
		
					}
				} catch (error) {
					console.error('Error during signup:', error);
					setStore({ message: 'Signup failed. Please try again.' });
				}
			},
		
			/* handleGoogleSignup : async (firstName, email, ) => {
			
				if (password !== confirmPassword) {
					setErrorMessage('The passwords do not match');
					return;
				}
		
				try {
					const response = await actions.signup({
						first_name: firstName,
						email: email,
						password: password,
						confirm_password: confirmPassword,
					});
			
					console.log("Full Response:", response); // Log the full response
		
					if (response) {
						alert('The user was created successfully')
						toLogin ("/?openLogin=true")
		
						
						//redirect user to Home Page and open login modal useLocation()
						console.log("SignUp successful");
					} else {
						const errorText = response?.message || 'An unknown error occurred';
						setErrorMessage(`SignUp failed: ${errorText}`);
						console.error("SignUp failed:", errorText);
					}
				} catch (error) {
					setErrorMessage('An error occurred during SignUp', error);
					console.error("Error during SignUp:", error);
				}
			}, */


			setIsLoggedIn: (isLoggedIn) => {
				const store = getStore();
				setStore({...store, isLoggedIn})
			},

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			setAccessToken: (token) => {
				setStore({ accessToken: token });
			},

			getAccessToken: () => {
				const store = getStore();
				return store.accessToken;
			},

			getMessage: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello", {
						headers: {
						  'Authorization': `Bearer ${getActions().getAccessToken()}`,
						},
					  });
					  const data = await resp.json();
					  setStore({ message: data.message });
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
