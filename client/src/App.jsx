import { NextUIProvider, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from '@nextui-org/react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { BookPage } from './pages/BookPage'
import { BookFormPage } from './pages/BookFormPage'
import { Navigation } from './components/Navigation'
import { Toaster, toast } from 'sonner'
import { ChevronDown, Lock, Activity, Flash, Server, TagUser, Scale } from './components/Icons.jsx'
import { AcmeLogo } from './components/AcmeLogo.jsx'
import './css/main.css'
import { Nav } from 'react-bootstrap'
// import { Nav } from 'react-bootstrap'
export const dynamic = 'force-dynamic'

function NavbarItemWithActive({ href, children }) {
  const location = useLocation()
  const isActive = location.pathname.startsWith(href)

  return (
    <NavbarItem isActive={isActive}>
      <Link href={href} color="foreground">
        {children}
      </Link>
    </NavbarItem>
  )
}

function App () {
  const icons = {
    chevron: <ChevronDown fill='currentColor' size={16} />,
    scale: <Scale className='text-warning' fill='currentColor' size={30} />,
    lock: <Lock className='text-success' fill='currentColor' size={30} />,
    activity: <Activity className='text-secondary' fill='currentColor' size={30} />,
    flash: <Flash className='text-primary' fill='currentColor' size={30} />,
    server: <Server className='text-success' fill='currentColor' size={30} />,
    user: <TagUser className='text-danger' fill='currentColor' size={30} />
  }

  return (
    <BrowserRouter>
      <Navbar
        style={{ backgroundColor: '#e8e8f55e' }}
        classNames={{
          item: [
            'flex',
            'relative',
            'h-full',
            'items-center',
            "data-[active=true]:after:content-['']",
            'data-[active=true]:after:absolute',
            'data-[active=true]:after:bottom-0',
            'data-[active=true]:after:left-0',
            'data-[active=true]:after:right-0',
            'data-[active=true]:after:h-[2px]',
            'data-[active=true]:after:rounded-[2px]',
            'data-[active=true]:after:bg-primary'
          ]
        }}
      >
        <NavbarBrand>
          <Link href='/' aria-current='page' color='foreground'>
            <AcmeLogo />
            <p className='font-bold text-inherit'>ACME</p>
          </Link>
        </NavbarBrand>
        <NavbarContent className='hidden sm:flex gap-4' justify='center'>
          <NavbarItemWithActive href='/almacen' children='Almacén' />
          <NavbarItemWithActive href='/pedidos' children='Pedidos'/>
          <NavbarItemWithActive href='/facturas' children='Facturas'/>
        </NavbarContent>
        <NavbarContent className='flex sm:hidden gap-4' justify='center'>
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className='p-0 bg-transparent data-[hover=true]:bg-transparent'
                  endContent={icons.chevron}
                  radius='sm'
                  variant='light'
                >
                  Acciones
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label='ACME features'
              className='w-[340px]'
              itemClasses={{
                base: 'gap-4'
              }}
            >
              <DropdownItem
                key='autoscaling'
                description='ACME scales apps to meet user demand, automagically, based on load.'
                startContent={icons.scale}
              >
                Autoscaling
              </DropdownItem>
              <DropdownItem
                key='usage_metrics'
                description='Real-time metrics to debug issues. Slow query added? We’ll show you exactly where.'
                startContent={icons.activity}
              >
                Usage Metrics
              </DropdownItem>
              <DropdownItem
                key='production_ready'
                description='ACME runs on ACME, join us and others serving requests at web scale.'
                startContent={icons.flash}
              >
                Production Ready
              </DropdownItem>
              <DropdownItem
                key='99_uptime'
                description='Applications stay on the grid with high availability and high uptime guarantees.'
                startContent={icons.server}
              >
                +99% Uptime
              </DropdownItem>
              <DropdownItem
                key='supreme_support'
                description='Overcome any challenge with a supporting team ready to respond.'
                startContent={icons.user}
              >
                +Supreme Support
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
        <NavbarContent className='hidden sm:flex gap-4' justify='end' />
      </Navbar>
      <Routes>
        <Route path='/almacen' element={<BookPage />} />
        <Route path='/almacen/crear-libro' element={<BookFormPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
