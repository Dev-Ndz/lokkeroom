const Register = () => {

    const [username, setUsername] = useState();
    const [passwork, setPassword] = useState();
    const [email, setEmail] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();

    
        // Example using fetch
        fetch('/api/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        })
            .then(response => {
            if (response.ok) {
                // Handle successful login
                console.log('Login successful!');
            } else {
                // Handle login failure
                console.error('Login failed');
            }
            })
            .catch(error => {
            console.error('Error occurred while logging in:', error);
            });
        };
    
    return (
    <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
        <div>
            <label>Username:</label>
            <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
        </div>
        <div>
            <label>Email:</label>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </div>
        <div>
            <label>Password:</label>
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </div>
        <button type="submit">Login</button>
        </form>
    </div>
    );

}
 
export default Register;