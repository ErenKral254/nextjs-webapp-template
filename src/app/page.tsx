'use client';

import { Box, Container, Heading, Text, VStack, Button, HStack } from '@chakra-ui/react';
import { FaGithub, FaRocket } from 'react-icons/fa';

export default function Home() {
  return (
    <Box minH="100vh" bg="gray.900">
      <Container maxW="container.xl" py={20}>
        <VStack gap={8} textAlign="center">
          <Heading
            as="h1"
            size="4xl"
            bgGradient="linear(to-r, blue.400, purple.500, pink.500)"
            bgClip="text"
          >
            {{APP_TITLE}}
          </Heading>
          
          <Text fontSize="xl" color="gray.400" maxW="2xl">
            A production-ready Next.js 15 template with Chakra UI, Prisma, 
            Kubernetes deployment, and GitOps support.
          </Text>

          <HStack gap={4}>
            <Button
              size="lg"
              colorScheme="blue"
              leftIcon={<FaRocket />}
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              colorScheme="gray"
              leftIcon={<FaGithub />}
            >
              View on GitHub
            </Button>
          </HStack>

          <Box
            mt={12}
            p={8}
            bg="gray.800"
            borderRadius="xl"
            border="1px solid"
            borderColor="gray.700"
            maxW="3xl"
            w="full"
          >
            <VStack gap={4} align="start">
              <Heading size="md" color="white">Quick Start</Heading>
              <Box
                as="pre"
                p={4}
                bg="gray.900"
                borderRadius="md"
                w="full"
                overflow="auto"
                fontSize="sm"
                color="green.400"
              >
                <code>
{`# Clone and setup
git clone https://github.com/{{GITHUB_ORG}}/{{APP_NAME}}.git
cd {{APP_NAME}}
npm install

# Start development
npm run dev`}
                </code>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}