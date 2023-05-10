"use client"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { signIn, signOut, getProviders, useSession } from "next-auth/react"


const Nav = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders();
    }, [])


    return (
        <nav className="flex_between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image src="/assets/images/logo.svg"
                    width={30}
                    height={30}
                    alt="promptify logo"
                    className="object-contain"
                />
                <p className="logo_text">Promtify</p>
            </Link>

            {/* desktop navbar */}
            <div className="hidden sm:flex">
                {session?.user ? <div className="flex gap-3 md:gap-5">
                    <Link
                        href="/create-prompt"
                        className="black_btn"
                    >
                        Create Post
                    </Link>
                    <button className="outline_btn" onClick={signOut}>Sign Out</button>
                    <Link href="/profile">
                        <Image src={session?.user.image}
                            width={37}
                            height={37}
                            className="object-contain rounded-full"
                            alt="profile"
                        />
                    </Link>
                </div> : <div>
                    {providers &&
                        Object.values(providers).map(provider => (
                            <button
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className="black_btn"
                            >Sign in</button>
                        ))
                    }
                </div>}
            </div>

            {/* mobile navbar */}
            <div className="sm:hidden flex relative">
                {
                    session?.user
                        ? <div className="flex">
                            <Image src={session?.user.image}

                                width={30}
                                height={30}
                                alt="promptify logo"
                                className="object-contain rounded-full"
                                onClick={() => setToggle(p => !p)}
                            />
                            {toggle && <div className="dropdown shadow-md">
                                <Link href="/profile" className="dropdown_link"
                                    onClick={() => setToggle(false)}>My Profile</Link>
                                <Link href="/create-prompt" className="dropdown_link"
                                    onClick={() => setToggle(false)}>Create Prompt</Link>
                                <button
                                    className="black_btn"
                                    onClick={() => {
                                        setToggle(false);
                                        signOut();
                                    }}>
                                    Sign out
                                </button>
                            </div>}
                        </div>
                        : <div>
                            {providers &&
                                Object.values(providers).map(provider => (
                                    <button
                                        key={provider.name}
                                        onClick={() => signIn(provider.id)}
                                        className="black_btn"
                                    >Sign in</button>
                                ))
                            }
                        </div>
                }
            </div>
        </nav>
    )
}

export default Nav