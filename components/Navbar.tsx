import React from 'react'

import { getAuthSession } from '@/lib/nextauth';
import SignInButton from './SignInButton';
import UserAccountNav from './userAccountNav';

const Navbar = async () => {
    const session = await getAuthSession();
    console.log(session?.user)
    return (
        <div>
            <div className='flex items-center justify-between'>
                <p>Sheets App</p>

                {session?.user ? (
                    <UserAccountNav user={session.user} />
                ): (
                        <SignInButton text = 'sign-in'/>
                )

                }
            </div>
        </div>
    )
}

export default Navbar