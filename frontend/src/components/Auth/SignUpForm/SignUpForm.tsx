import React from 'react';
import { SignUpFormProps } from '../Types';

const SignUpForm: React.FC<SignUpFormProps> = ({ formData, onInputChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Username: </label>
        <input 
          type="text" 
          name="username"
          value={formData.username} 
          onChange={onInputChange} 
        />
    </div>  
      <div>
        <label>Email: </label>
        <input 
          type="email" 
          name="email"
          value={formData.email} 
          onChange={onInputChange} 
        />
      </div>
      <div>
        <label>Password: </label>
          <input 
            type="password" 
            name="password"
            value={formData.password} 
            onChange={onInputChange} 
          />
        </div>
        <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUpForm;
