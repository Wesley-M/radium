import type { Meta, StoryObj } from '@storybook/react';
import { Surface } from '.';
import { ThemeProvider } from '@design-system/theme';
import { Card } from '@design-system/components/surfaces/card';

const meta = {
  title: 'Design-System/surfaces/Surface',
  component: Surface,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <ThemeProvider>
        <Story/>
      </ThemeProvider>
    )
  ]
} satisfies Meta<typeof Surface>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock grid items
const mockItems = (n: number) => {
    return new Array(n).fill(0).map(
      (_, i) => (
        <Card
            title={`Radio Station ${i}`}
            subtitle="Gender 1, Gender 2, Gender 3, Gender 4, Gender 5"
            imageProps={{ src: "https://picsum.photos/400" }}
            padding="sm"
            borderRadius='md'
        />
      )
    )
}


export const Default: Story = {
    args: {
        sx: { width: "20em", height: "20em" },
        borderRadius: "lg",
        color: "sr-400"
    },
};

export const WithCard: Story = {
    args: {
    children: mockItems(1),
        sx: { width: "20em" }
    },
};