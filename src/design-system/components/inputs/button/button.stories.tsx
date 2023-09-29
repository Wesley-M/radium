import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '.';
import { ThemeProvider } from '@design-system/theme';
import { Box } from '@mui/material';

const meta = {
  title: 'Design-System/inputs/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <ThemeProvider>
          <Box sx={{ backgroundColor: "#1B1B1B", padding: "4em", borderRadius: "2em" }}>
              <Story />
          </Box>
      </ThemeProvider>
    )
  ]
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: "button",
        onClick: () => alert("clicked!")
    },
};

