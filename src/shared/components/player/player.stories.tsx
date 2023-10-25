import type { Meta, StoryObj } from '@storybook/react';
import { Player } from '.';
import { ThemeProvider } from '@design-system/theme';

const meta = {
  title: 'Components/Player',
  component: Player,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    )
  ]
} satisfies Meta<typeof Player>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        
    },
};