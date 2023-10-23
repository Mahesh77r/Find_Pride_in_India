import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      // Use the token directly from useParams()
      await axios.post(`https://find-pride-in-india-mqtp.vercel.app/dom/resetpassword/${token}`, {
        password,
      });

      // Show a success message to the user
      alert(
        "Password reset successful! You can now log in with your new password."
      );
      window.location.assign("/login");
      // Redirect the user to the login page or any other appropriate page
      // Example: props.history.push('/login');
    } catch (error) {
      console.error("Error resetting password:", error.response.data.error);
      alert("Failed to reset password. Please try again later.");
      window.location.assign("/login");
    }
  };

  return (
    <div>
      <form onSubmit={handleResetPassword}>
        <label>New Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;