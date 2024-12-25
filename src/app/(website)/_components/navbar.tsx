import { Menu, User } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Props = {
    name: string
}

const LandingPageNavBar = ({ }: Props) => {
    return (
        <div className='flex w-full justify-between items-center'>
            <div className='text-3xl font-semibold flex items-center gap-x-3'>
                <Menu className='w-8 h-8' />
                <Image
                    alt='logo'
                    src="/opva-logo.png"
                    width={40}
                    height={40}
                />
                OpvaAI
            </div>
            <div className='hidden gap-x-10 items-center lg:flex'>
                <Link href='/' className='py-2 px-5 font-semibold text-lg rounded-full hover:bg-slate-600'>Home</Link>
                <Link href='/'>Pricing</Link>
                <Link href='/'>Contact</Link>
            </div>
            <Link href='/auth/sign-in'>
                <Button className='text-base flex gap-x-2'>
                    <User fill='#000' />
                    Log In
                </Button>
            </Link>
        </div>
    )
}

export default LandingPageNavBar