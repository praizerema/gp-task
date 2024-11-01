import { FC, ReactNode } from 'react';
import { NavBar } from './navbar';


export const Layout: FC<{children?: ReactNode}> = ({children}) =>{
    return (
        <div className='min-h-screen relative bg-home bg-cover bg-bottom'>
        <NavBar/>
        {children}
        <footer className='bottom-0 absolute bg-[#7371FC] w-full py-4 text-white text-center'>
            Footer
        </footer>
        </div>
    )
}