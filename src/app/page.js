'use client'; // Obligatoire ici

import LoginForm from '../components/ConnexionForm';
import RegisterForm from '../components/RegisterForm';
import RealtimeMap from '../components/RealTimeMap';

export default function Home() {
  return (
    <div>
      <LoginForm />
      <RegisterForm />
      <RealtimeMap />
    </div>
  );
}