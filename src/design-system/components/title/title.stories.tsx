import type { Meta, StoryObj } from '@storybook/react';
import { Title } from '.';
import { ThemeProvider } from '@design-system/theme';
import { Box } from '@mui/material';

const meta = {
    title: 'Components/Title',
    component: Title,
    parameters: {
      layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        as: { options: ["h1", "h2", "h3", "h4", "h5", "h6", "body1", "body2"], control: 'select' },
        isUppercase: { control: 'boolean' },
    },
    decorators: [
        (Story: any) => (
            <ThemeProvider>
                <Box sx={{ backgroundColor: "#292929", padding: "2em", borderRadius: "8px" }}>
                    <Story />
                </Box>
            </ThemeProvider>
        ),
    ],
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Recently Player',
    },
};

export const Above: Story = {
    args: {
        above: 'Pickup were you left off',
        children: "Recently Player"
    },
};
