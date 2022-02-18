import React, { useContext, useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
// other files
import Header from '../Components/Header'
import { UserContext } from '../Contexts/UserContext'
import { USER_CREATE_RESET } from '../Config/UserConstant'
import { CircularProgress } from '@mui/material'

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()

const Register = () => {
  // state
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const history = useNavigate()
  const [_nameHelper, _setNameHelper] = useState({
    helperTextName: '',
    errorName: false,
  })
  const [_emailHelper, _setEmailHelper] = useState({
    helperTextEmail: '',
    errorEmail: false,
  })
  const [_passwordHelper, _setPasswordHelper] = useState({
    helperTextPassword: '',
    errorPassword: false,
  })

  // context
  const {
    userCreate: userState,
    userCreateDispatch,
    createUser,
  } = useContext(UserContext)
  const { loading, info, error } = userState

  // validation
  const valid = () => {
    if (name.length === 0) {
      _setNameHelper({
        ..._nameHelper,
        helperTextName: 'Harap Masukkan Name Lengkap',
        errorName: true,
      })
    } else {
      _setNameHelper({
        ..._nameHelper,
        helperTextName: '',
        errorName: false,
      })
    }
    if (email.length === 0) {
      _setEmailHelper({
        ..._emailHelper,
        helperTextEmail: 'Harap Masukkan Email Lengkap',
        errorEmail: true,
      })
    } else {
      _setEmailHelper({
        ..._emailHelper,
        helperTextEmail: '',
        errorEmail: false,
      })
      if (password.length === 0) {
        _setPasswordHelper({
          ..._passwordHelper,
          helperTextPassword: 'Harap Masukkan Password Lengkap',
          errorPassword: true,
        })
      } else {
        _setPasswordHelper({
          ..._passwordHelper,
          helperTextPassword: '',
          errorPassword: false,
        })
      }
    }
  }

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = JSON.parse(localStorage.getItem('token'))
    valid()
    const dataUser = {
      name,
      email,
      password,
    }
    if (dataUser) {
      await createUser(dataUser, token)
      console.log(dataUser)
      localStorage.setItem('user-info', JSON.stringify(dataUser))
      history('/')
    } else {
      console.log('Harap Masukkan Data!')
    }
  }

  const cleanInput = () => {
    userCreateDispatch({
      type: USER_CREATE_RESET,
    })
    setName('')
    setEmail('')
    setPassword('')
  }

  useEffect(() => {
    if (info) {
      cleanInput()
    }
    if (error) {
      alert(error)
      userCreateDispatch({
        type: USER_CREATE_RESET,
      })
    }
    return () => {
      userCreateDispatch({
        type: USER_CREATE_RESET,
      })
    }
  }, [info, error])

  return (
    <>
      <Header />
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Register
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete='given-name'
                    name='name'
                    required
                    fullWidth
                    id='name'
                    label='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    helperText={_nameHelper.helperTextName}
                    error={_nameHelper.errorName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    helperText={_nameHelper.helperTextEmail}
                    error={_nameHelper.errorEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='new-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    helperText={_nameHelper.helperTextPassword}
                    error={_nameHelper.errorPassword}
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? (
                  <CircularProgress style={{ color: '#fff' }} />
                ) : (
                  'Register'
                )}
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </>
  )
}

export default Register
