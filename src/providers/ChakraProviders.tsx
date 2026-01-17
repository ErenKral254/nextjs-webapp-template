'use client';

import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';

import { system } from '@/theme';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function ChakraProviders({ children }: ProvidersProps) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
}