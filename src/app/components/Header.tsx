import Link from 'next/link'
import {getSignInUrl,getUser,signOut} from '@workos-inc/authkit-nextjs'


export default async function Header(){
    const {user}=await getUser();
    const signInUrl=await getSignInUrl();
    return(
        <header>
            <div className="container flex item-center justify-between mx-auto my-4">
                <Link href={'/'} className="font-bold text-xl">Job Board</Link>
                <nav className="flex gap-2">
                    {!user &&(
                        <Link href={signInUrl} className="rounded-md bg-gray-200 py-1 px-2 sm:py-2 sm:px-4">
                            Login
                        </Link>
                    )}
                    {user &&(
                        <form action={async ()=>{
                            'use server';
                            await signOut();
                        }}>
                            <button type="submit" className="rounded-md bg-gray-200 py-1 px-2 sm:py-2 sm:px-4">
                                Logout
                            </button>
                        </form>
                    )}
                    <Link className="rounded-md py-1 px-2 sm:py-2 sm:px-4 bg-blue-600 text-white" href={'/new-listing'}>
                    Post a job
                    </Link>

                </nav>
            </div>
        </header>
    )
}