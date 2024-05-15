import { Box, Typography } from '@mui/material'
import React from 'react'
import { Colors } from '../../Assets/Styles/Colors'

export default function Dashboard() {
  return (
    <Box sx={{ mt: 5, ml: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "600", fontSize: "20px" ,color:Colors.primary  }}
        >
          Dashboard
        </Typography>
      </Box>
  )
}
