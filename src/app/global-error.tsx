'use client';

import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <Box minH="100vh" bg="gray.900" display="flex" alignItems="center">
          <Container maxW="container.md">
            <VStack gap={6} textAlign="center">
              <Heading color="red.400">Something went wrong!</Heading>
              <Text color="gray.400">
                An unexpected error occurred. Please try again.
              </Text>
              <Button colorScheme="blue" onClick={reset}>
                Try again
              </Button>
            </VStack>
          </Container>
        </Box>
      </body>
    </html>
  );
}