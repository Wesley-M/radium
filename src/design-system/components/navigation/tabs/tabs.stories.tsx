import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '.';
import { ThemeProvider } from '@design-system/theme';
import { Box } from '@mui/material';

const meta = {
  title: 'Design-System/navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
        <ThemeProvider>
            <Box sx={{ backgroundColor: "#292929", padding: "2em", borderRadius: "8px" }}>
                <Story />
            </Box>
        </ThemeProvider>
    ),
],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
      items: [
        { label: "All", value: "all" },
        { label: "Your library", value: "your-library" },
        { label: "Recently played", value: "recently-played" },
      ],
      onChange: (newValue: string) => console.log(newValue)
    },
};