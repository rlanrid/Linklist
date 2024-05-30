'use client';

import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HeroForm({ user }) {
  const router = useRouter();
  useEffect(() => {
    console.log(user);
    if ('localStorage' in window && window.localStorage.getItem('desiredUsername')) {
      const username = window.localStorage.getItem('desiredUsername');
      window.localStorage.removeItem('desiredUsername');
      redirect('/account?desiredUsername=' + username);
    }
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const input = form.querySelector('input');
    const username = input.value;

    if (username.length > 0) {
      if (user) {
        router.push('/account?desiredUsername=' + username)
      } else {
        window.localStorage.setItem('desiredUsername', username);
        await signIn('google');
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='inline-flex items-center shadow-lg shadow-gray-500/20'
    >
      <span className='bg-white py-4 pl-4'>
        linklist.to/
      </span>
      <input
        type='text'
        className='py-4'
        placeholder='username'
      />
      <button
        type='submit'
        className='bg-blue-500 text-white py-4 px-6'
      >
        Join for free
      </button>
    </form>
  );
}