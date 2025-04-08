'use client';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { useRouter } from 'next/navigation';

export default function ChangePasswordFormField({ newPassword, oldPassword, setNewPassword, setOldPassword, onSubmit }) {
    const router = useRouter();
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <Input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="Ancien mot de passe" />
            <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Nouveau mot de passe" />
            <div className='flex justify-between gap-20'>
                <Button text="Annuler" type="button" onClick={() => router.push('/dashboard')} className="w-full mt-4 bg-gray-300 text-black px-4 py-2 font-bold rounded hover:bg-gray-400 transition duration-300"/>
                <Button text="Changer le mot de passe" type="submit" />
            </div>
        </form>
    );
}
