import React, { useState } from 'react';
import { UserSchema } from './UserSchema';
import { z } from 'zod';



const UserForm: React.FC = () => {
  type UserInput = z.infer<typeof UserSchema>;
  const [errors, setErrors] = useState<Partial<Record<keyof UserInput, string>>>({});

  const [formData, setFormData] = useState<UserInput>({
    name: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const result = UserSchema.safeParse(formData);
  
    if (result.success) {
      console.log("✅ Valid input:", result.data);
      alert("Form submitted successfully!");
      setErrors({});
    } else {
      const fieldErrors: Record<string, string> = {};
      console.log(result.error.errors,'result')
      result.error.errors.forEach((err) => {
        if (err.path.length) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>User Form</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>Name:</label><br />
        <input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
/>
{errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Email:</label><br />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
