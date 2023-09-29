import type { Meta, StoryObj } from '@storybook/react';
import { ActionButton } from '.';
import { ThemeProvider } from '@design-system/theme';
import { Box } from '@mui/material';
import PlayCircleFilledWhiteRoundedIcon from '@mui/icons-material/PlayCircleFilledWhiteRounded';

const meta = {
  title: 'Design-System/inputs/ActionButton',
  component: ActionButton,
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
} satisfies Meta<typeof ActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SmallOpacityEffect: Story = {
    args: {
        icon: <PlayCircleFilledWhiteRoundedIcon/>,
        hoverEffect: "opacity"
    },
};

export const SmallScaleEffect: Story = {
    args: {
        icon: <PlayCircleFilledWhiteRoundedIcon/>,
        hoverEffect: "scale"
    },
};

export const SmallBothEffect: Story = {
    args: {
        icon: <PlayCircleFilledWhiteRoundedIcon/>,
        hoverEffect: "both"
    },
};

export const SmallColored: Story = {
    args: {
        icon: <PlayCircleFilledWhiteRoundedIcon/>,
        hoverEffect: "both",
        color: "accent"
    },
};

export const LargeBothEffect: Story = {
    args: {
        icon: <PlayCircleFilledWhiteRoundedIcon/>,
        hoverEffect: "both",
        size: "lg"
    },
};

export const Loading: Story = {
    args: {
        icon: <PlayCircleFilledWhiteRoundedIcon/>,
        hoverEffect: "both",
        loading: true
    },
};
