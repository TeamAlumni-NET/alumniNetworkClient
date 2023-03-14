import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import keycloak from '../../keycloak'
import { strings } from '../../utils/localization'


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%'
})

function Profile () {

  const url = "https://localhost:7252/api/users/2"
  const token = keycloak.token
  const [userDetails, setUserDetails] = useState(null)

  useEffect(() => {
    const headers = { 'Authorization': `bearer ${token}`,
      'Content-Type': 'application/json'
    }
    fetch(url, { headers })
      .then(response => response.json())
      .then(data => setUserDetails(data))
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: '75%',
        flexGrow: 1,
        backgroundColor: theme =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
      }}
    >
      <Grid container spacing={2}>
        <Grid item sx={{ width: 128, height: 128 }}>
          <Img alt='complex' src={userDetails?.pictureUrl} />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction='column' spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant='subtitle1' component='div'>
                {userDetails?.firstName} {userDetails?.lastName}
              </Typography>
              <Typography variant='body2' gutterBottom>
                {userDetails?.status}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <ButtonBase sx={{ width: 80, height: 50 }}>
              <Typography variant='subtitle1' component='div'>
                {strings.profilePage.edit}
              </Typography>
            </ButtonBase>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item>
          <Typography gutterBottom variant='body2' component='div'>
            {userDetails?.funFact}
          </Typography>
        </Grid>
        <Grid
          item
          xs
          container
          direction='column'
          spacing={2}
          sx={{ height: 600 }}
        >
          <Grid item xs>
            <Box sx={{ backgroundColor: 'lightgrey',
              height:500 }}>
              <Typography variant='body2' gutterBottom>
                {userDetails?.bio}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}
export default Profile