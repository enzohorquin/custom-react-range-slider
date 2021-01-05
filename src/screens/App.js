import React from 'react';
import { Heading, Stack, Button } from "@chakra-ui/react"
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Heading> Mango Coding Challenge </Heading>
      <Stack spacing={4} direction="column" align="center">
        <Button colorScheme="teal" size="md">
          <Link to='/exercise1'>
            Exercise 1
          </Link>
        </Button>
        <Button colorScheme="teal" size="md">
          <Link to='/exercise2'>
            Exercise 2
          </Link>
        </Button>
      </Stack>
    </>
  )
}

export default App;
