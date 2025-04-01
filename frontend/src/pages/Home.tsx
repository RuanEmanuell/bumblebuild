import { useEffect } from 'react';
import { userService } from '../service/userService';
import {LogoPrimary} from '../components/Logo';


export default function Home() {
    useEffect(() => {
        console.log(userService.getUsers());
    }, [])

    return (
        <div className='bg-primary w-screen h-screen flex flex-col justify-center items-center'>
            <LogoPrimary></LogoPrimary>
            <h1 className='text-4xl font-bold animate-pulse'>Em construção...</h1>
        </div>
    )
}