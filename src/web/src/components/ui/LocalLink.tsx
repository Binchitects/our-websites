import type { ComponentProps } from 'react'
import { Link as RouterLink, NavLink as RouterNavLink, useLocation } from 'react-router-dom'
import { langFromPath, localizePath, type Lang } from '@/lib/i18n'

type LinkProps = ComponentProps<typeof RouterLink>
type NavLinkProps = ComponentProps<typeof RouterNavLink>

function localized(to: LinkProps['to'], lang: Lang): LinkProps['to'] {
  return typeof to === 'string' ? localizePath(to, lang) : to
}

/** Router links that keep the reader in the current language. */
export function Link({ to, ...props }: LinkProps) {
  const { pathname } = useLocation()
  return <RouterLink to={localized(to, langFromPath(pathname))} {...props} />
}

export function NavLink({ to, ...props }: NavLinkProps) {
  const { pathname } = useLocation()
  return <RouterNavLink to={localized(to, langFromPath(pathname))} {...props} />
}
