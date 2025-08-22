import * as React from "react";

const containerStyle: React.CSSProperties = {
  width: "300px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  marginTop: "8px",
};

const SignInDialog: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);

  const sendLink = (event: React.FormEvent) => {
    event.preventDefault();
    setSent(true);
  };

  const reset = () => {
    setEmail("");
    setSent(false);
  };

  return (
    <div style={containerStyle}>
      {sent ? (
        <div>
          <p>Please check your email for the magic link.</p>
          <button type="button" onClick={reset} style={buttonStyle}>
            Back to sign in
          </button>
        </div>
      ) : (
        <form onSubmit={sendLink}>
          <input
            type="email"
            required
            value={email}
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Send magic link
          </button>
        </form>
      )}
    </div>
  );
};

export default SignInDialog;
