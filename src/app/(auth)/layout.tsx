import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Wander',
  description: 'Building the future of travel'
};

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="h-ful w-full">{children}</main>;
}
