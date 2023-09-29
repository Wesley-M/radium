import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { ThemeProvider } from '@design-system/theme';
import { Marquee } from '@design-system/components/data-display/marquee';

const meta = {
  title: 'Design-System/data-display/Marquee',
  component: Marquee,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <ThemeProvider>
        <Box 
          width="80vw" 
          sx={{ 
            backgroundColor: "#1b1b1b",
            borderRadius: "4px", 
            padding: "1em"
          }}
        >
          <Story/>
        </Box>
      </ThemeProvider>
    )
  ]
} satisfies Meta<typeof Marquee>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ShortText: Story = {
    args: {
      text: "I don't need to move",
      textProps: {
          as: "h1",
      }
    },
  };

export const Default: Story = {
  args: {
    text: "Lorem Ipsum is simply dummy text of the printing. Lorem Ipsum is simply dummy text of the printing.",
    textProps: {
        as: "h2",
        color: "accent"
    }
  },
};