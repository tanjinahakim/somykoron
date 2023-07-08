'use client'
import React from 'react';
import UserForm from './components/UserForm/UserForm';
import Task from './components/Task/Task';

export default function Home() {

  return (
    <div className='text-center bg-slate-300'>
      <Task/>
      <UserForm/>
    </div>
  );
}
