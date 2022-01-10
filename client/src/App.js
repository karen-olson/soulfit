import SignUpForm from "./SignUpForm";

function App() {
  return (
    <div className="App">
      <SignUpForm />
    </div>
  );
}

export default App;

// Create a SignUpForm component
// Make a static form that accepts name, username, password, and password confirmation
// Add state (formData in form, users in App)
// Add inverse data flow (send formData up to App)
// In App, send new user data to backend & update users state
