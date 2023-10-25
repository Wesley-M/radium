import type { Meta, StoryObj } from '@storybook/react';
import { SearchField } from '.';
import { ThemeProvider } from '@design-system/theme';
import { Box } from '@mui/material';

const meta = {
  title: 'Design-System/inputs/Search',
  component: SearchField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <ThemeProvider>
          <Box 
            sx={{ 
              backgroundColor: "#1B1B1B", 
              height: "20vh",
              width: "80vw",
              position: "relative",
              margin: 0
            }}
          >
              <Story />
          </Box>
      </ThemeProvider>
    )
  ]
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
      placeholder: "Search for stations or tags...",
      onChange: () => console.log("I changed!")
    },
};