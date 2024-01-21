import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {type User} from "next-auth";
import Image from 'next/image'
import { type AvatarProps } from '@radix-ui/react-avatar';


interface Props extends AvatarProps{
    user : Pick<User, 'name' | 'image'>
}

const UserAvatar = ({user,...props}: Props) => {
    return (
        <Avatar {...props}>
            {user?.image ?(
                <div className='relative w-full h-full aspect-square'>
                    <Image
                    fill
                    src={user.image}
                    alt="Profile Picture"
                    referrerPolicy="no-referrer"
                    />
                   
                </div> 
            ):(

                <AvatarFallback>
                CN
                <span className='sr-only'>{user?.name}</span>
                </AvatarFallback>
                )}
        </Avatar>

    )
}

export default UserAvatar