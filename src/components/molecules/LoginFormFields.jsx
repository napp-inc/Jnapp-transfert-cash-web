'use client';

import Input from '../atoms/Input';
import CustomLink from '../atoms/Link';
import Button from '../atoms/Button';

export default function LoginFormFields({ email, setEmail, password, setPassword, onSubmit }) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
            <CustomLink href="#" text="Mot de passe oublié ?" />
            <Button text="Se connecter" type="submit" />
        </form>
    );
}
