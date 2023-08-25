import React from 'react';

const LoginForm: React.FC<LoginFormProps> = ({ formData, onInputChange, onSubmit }) => {

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Email: </label>
        <input 
          type="email" 
          value={formData.email} 
          onChange={onInputChange} 
        />
      </div>
      <div>
        <label>Password: </label>
          <input 
            type="password" 
            value={formData.password} 
            onChange={onInputChange} 
          />
        </div>
    </form>
  );
}

export default LoginForm;
