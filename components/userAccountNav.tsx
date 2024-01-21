"use client"

import React from 'react'
import { User } from "next-auth"
import { signOut } from 'next-auth/react'
import UserAvatar from './userAvatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { LogOut } from "lucide-react"

type Props = {
    user: Pick<User, "name" | "image" | "email">
};

const UserAccountNav = ({ user }: Props) => {
    return (
            <DropdownMenu>
                <DropdownMenuTrigger><UserAvatar className='w-10 h-10'
                    user={{
                        name: user.name || null,
                        image: user.image || null,
                    }}
                />
                </DropdownMenuTrigger>
                <DropdownMenuContent className = "bg-white" align="end">
                    {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem> */}
                    <div className='flex items-center justify-start gap-2 p-2'>
                        <div className='flex flex-col space-y-1 leading-none'>
                            {user.name && <p className='font-medium text-black'>{user.name}</p>}
                            {user.email && <p className='w-[200px] text-sm truncate text-zinc-500'>{user.email}</p>}
                        </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/profile" className='font-medium text-black' >Meow</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={(event : any) => {
                        event.preventDefault();
                        signOut().catch(console.error)}}
                        className = "text-red-600 cursor"
                        >
                        Sign out
                        <LogOut className='ml-2 w-4 h-4'  />
                        </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
    )
}

export default UserAccountNav