'use client'
import React from 'react';
import create from 'zustand';

type FormData = {
  name: string;
  email: string;
  age: string;
};

type FormSubmission = FormData;

type FormState = {
  formData: FormData;
  formSubmissions: FormSubmission[];
  setFormData: (data: Partial<FormData>) => void;
  submitForm: () => void;
};

const useFormStore = create<FormState>((set) => ({
  formData: { name: '', email: '', age: '' },
  formSubmissions: [],
  setFormData: (data) => set((state) => ({ ...state, formData: { ...state.formData, ...data } })),
  submitForm: () => set((state) => ({ ...state, formSubmissions: [...state.formSubmissions, state.formData], formData: { name: '', email: '', age: '' } })),
}));

const Form = () => {
  const { formData, setFormData, submitForm } = useFormStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Perform form validation
    const { name, email, age } = formData;
    if (!name || !email || !age || isNaN(Number(age))) {
      console.log('Invalid form data');
      return;
    }

    submitForm();
  };

  return (
    <div>
      <h2>Form</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block text-left text-gray-700 font-bold mb-2">
          Name:
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder='Enter your name'
          required
          className="w-full border border-gray-400 p-2 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-left text-gray-700 font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder='Enter your email'
          required
          className="w-full border border-gray-400 p-2 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="age" className="block text-left text-gray-700 font-bold mb-2">
          Age:
        </label>
        <input
          type="text"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder='Enter your age'
          required
          className="w-full border border-gray-400 p-2 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
    </div>
  );
};

const DisplayData = () => {
  const { formSubmissions } = useFormStore();

  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className='font-semibold text-lg'>Users Details</h1>
      <table className="border-collapse border border-gray-400 mt-5">
      <thead>
        <tr>
          <th className="border border-gray-400 px-4 py-2">Name</th>
          <th className="border border-gray-400 px-4 py-2">Email</th>
          <th className="border border-gray-400 px-4 py-2">Age</th>
        </tr>
      </thead>
      <tbody>
        {formSubmissions.map((submission, index) => (
          <tr key={index}>
            <td className="border border-gray-400 px-4 py-2">{submission.name}</td>
            <td className="border border-gray-400 px-4 py-2">{submission.email}</td>
            <td className="border border-gray-400 px-4 py-2">{submission.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

const UserForm = () => {
  return (
    <div>
      <h1 className='my-10 text-3xl font-bold'>Form Application</h1>
      <div className='grid grid-cols-2'>
      <Form />
      <DisplayData />
      </div>
    </div>
  );
};

export default UserForm;
