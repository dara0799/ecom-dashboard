import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// other files
import './Header.css'
import { UserContext } from '../Contexts/UserContext'

const pagesAuth = [
  {
    title: 'Product List',
    link: '/product',
  },
  {
    title: 'Add Product',
    link: '/add',
  },
  {
    title: 'Search Product',
    link: '/search',
  },
]
const pagesNotAuth = [
  {
    title: 'Login',
    link: '/login',
  },
  {
    title: 'Register',
    link: '/',
  },
]
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

const Header = () => {
  // MUI State
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  // MUI Function
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  // State Akses Menu
  const [allMenu, setAllMenu] = useState(pagesNotAuth)

  // Pembatasan Hak Akses
  let user = JSON.parse(localStorage.getItem('token'))

  // context
  const { logout } = useContext(UserContext)

  // logout
  const history = useNavigate()
  const handlerLogout = () => {
    logout()
    // localStorage.clear()
    history('/login')
  }

  useEffect(() => {
    if (user) {
      setAllMenu(pagesAuth)
    }
  }, [user])

  return (
    <>
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {allMenu.map((page) => (
                  <MenuItem
                    // href={page.link}
                    // containerElement={<Link to={page.link} />}
                    component={Link}
                    to={page.link}
                    key={page.title}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign='center'>{page.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {allMenu.map((page) => (
                <Button
                  // href={page.link}
                  // containerElement={<Link to={page.link} />}
                  to={page.link}
                  component={Link}
                  key={page.title}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.title}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* {settings.map((setting) => ( */}
                <MenuItem key='logout' onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign='center'
                    component={Button}
                    onClick={handlerLogout}
                  >
                    Logout
                  </Typography>
                </MenuItem>
                {/* ))} */}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default Header
