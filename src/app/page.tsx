'use client'
import React from 'react';
import TaskManager from './components/Task/Task';
import UserForm from './components/UserForm/UserForm';

export default function Home() {

  return (
    <div className='text-center max-w-5xl'>
      <TaskManager/>
      <UserForm/>
    </div>
  );
}
