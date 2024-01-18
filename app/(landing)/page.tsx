import Image from 'next/image'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import SignInButton from '@/components/SignInButton'


export default function Home() {

  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <Card className='w-[500px]'>
        <CardHeader>
          <CardTitle>Welcome to Sheetsio 🔥!</CardTitle>
          <CardDescription>The app allows users to convert Google Sheets data into JSON format.
            It provides an easy way to extractSheet data out of Google Sheets and make it available through a JSON API.
          </CardDescription>
        </CardHeader>
        <CardContent>
        <SignInButton text='Sign in with Google' />
        </CardContent>
      </Card>
    </div>

  )
}
