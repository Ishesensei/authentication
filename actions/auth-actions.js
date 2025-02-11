'use server';

import { hashUserPassword } from '@/lib/hash';
import createUser from '@/lib/user';
import { redirect } from 'next/navigation';

export default async function signup(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  let errors = {};
  if (!email) {
    errors.email = 'Please enter an email.';
  } else if (!email.includes('@')) {
    errors.email = 'Email isnt valid!';
  }

  if (!password) {
    errors.password = 'Please enter a password.';
  } else if (password.trim().length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }
  const hashedPassword = hashUserPassword(password);
  const createdUser = await createUser(email, hashedPassword);
  console.log('✌️createdUser --->', createdUser);
  redirect('/training');
}
