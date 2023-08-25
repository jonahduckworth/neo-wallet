import React from 'react';

const SignUpForm: React.FC<SignUpFormProps> = ({ formData, onInputChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Username: </label>
        <input 
          type="text" 
          value={formData.username} 
          onChange={onInputChange} 
        />
    </div>  
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

export default SignUpForm;
