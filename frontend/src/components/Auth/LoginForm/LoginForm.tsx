import React from 'react';
import { LoginFormProps } from '../Types';

const LoginForm: React.FC<LoginFormProps> = ({ formData, onInputChange, onSubmit }) => {

  return (
    <form onSubmit={onSubmit}>
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
        <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
