import { CardContent, Typography, Card } from '@mui/material'
import React from 'react'

const CardEl = ({mt, bg, title, value}) => {
  return (
    <>
       <Card
            sx={{
              minWidth: 230,
              maxWidth: 250,
              minHeight: 180,
              boxShadow: 6,
              maxHeight: 180,
              mr: 2,
              m: 3,
              backgroundColor: bg,
            }}
          >
            <CardContent sx={{textAlign: 'center', mt: mt}}>
              <Typography variant="title" component={'h2'}>{title}</Typography>
              <Typography  ml={6} mt={1} textAlign={'center'} width={100} border={1} variant="title" component={'h2'}>{value}</Typography>
            </CardContent>
          </Card>
    </>
  )
}

export default CardEl
