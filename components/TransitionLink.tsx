'use client';

import Link, { LinkProps } from 'next/link';
import { MouseEvent, ReactNode } from 'react';
import { usePageTransition } from './PageTransition';
import { usePathname } from 'next/navigation';

type Props = LinkProps & {
  className?: string;
  children: ReactNode;
  disableTransition?: boolean;
};

export default function TransitionLink({
  className,
  children,
  href,
  disableTransition,
  ...rest
}: Props) {
  const { startTransition } = usePageTransition();
  const pathname = usePathname();

  const hrefStr = typeof href === 'string' ? href : '';
  const navigatingToEvents = hrefStr.startsWith('/events');
  const onEventsPage = typeof pathname === 'string' && pathname.startsWith('/events');

  const shouldDisable = disableTransition || navigatingToEvents || onEventsPage;

  const handleClick = (_e: MouseEvent<HTMLAnchorElement>) => {
    if (!shouldDisable) {
      startTransition();
    }
  };

  return (
    <Link
      {...rest}
      href={href}
      onClick={handleClick}
      className={className}
      prefetch={rest.prefetch ?? true}
    >
      {children}
    </Link>
  );
}
