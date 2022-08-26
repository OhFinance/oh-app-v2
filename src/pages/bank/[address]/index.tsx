import { useRouter } from 'next/router';

export default function BankAddress() {
  const router = useRouter();
  console.log('pathname: ', router.pathname);
  console.log('router: ', router);
  return <div>address: {router.query?.address}</div>;
}
