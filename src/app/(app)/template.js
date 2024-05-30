import { Lato } from 'next/font/google'
import '../globals.css'
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Image from 'next/image';
import { headers } from 'next/headers'
import { redirect } from 'next/navigation';
import AppSidebar from '@/components/layout/AppSidebar';
import { Toaster } from 'react-hot-toast';

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] })

export default async function AppTemplate({ children, ...rest }) {
  const headerList = headers();
  const url = headerList.get('next-url');

  console.log(url)

  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect('/');
  }

  return (
    <html lang="en">
      <body className={lato.className}>
        <Toaster />
        <main className='flex min-h-screen'>
          <aside className='bg-white w-48 p-4 shadow'>
            <div className='rounded-full overflow-hidden aspect-square w-24 mx-auto'>
              <Image src={session.user.image} width={254} height={254} alt={'avatar'} />
            </div>
            <div className='text-center'>
              <AppSidebar />
            </div>
          </aside>
          <div className='grow'>
            <div className='bg-white m-8 p-4 shadow'>
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
