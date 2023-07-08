'use client'
import React from 'react';
import UserForm from './components/UserForm/UserForm';
import TaskManager from './components/Task/Task';

export default function Home() {

  return (
    <div className='text-center max-w-5xl'>
      <TaskManager/>
      <UserForm/>
    </div>
  );
}
