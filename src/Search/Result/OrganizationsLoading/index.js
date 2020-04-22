import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '600px',
    height: '1px',
    // '& > * + *': {
    //   marginTop: theme.spacing(2),
    // },
  },
   colorPrimary: '#C668CD'
}))

const OrganizationsLoading = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <LinearProgress variant="query" />
    </div>
  )
}

export {
  OrganizationsLoading
}
