import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

import './index.css'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
   colorPrimary: '#C668CD'
}))

const ResultsLoading = ({ fetching }) => {
  const classes = useStyles()

  return (
    <div className="loading">
      { fetching &&
      <div className={classes.root}>
        <LinearProgress variant="query" />
      </div>}
    </div>
  )
}

export {
  ResultsLoading
}
