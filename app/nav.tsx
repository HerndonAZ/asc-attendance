import { getToday } from '@/lib/db';
import { auth } from './auth';
import Navbar from './navbar';

export default async function Nav() {

  const date = getToday()
  console.log(date, 'date')
  const session = await auth();
  return <Navbar user={session?.user} />;
}
