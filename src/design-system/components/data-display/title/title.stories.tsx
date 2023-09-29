import type { Meta, StoryObj } from '@storybook/react';
import { Title } from '.';
import { ThemeProvider } from '@design-system/theme';
import { Box } from '@mui/material';

const meta = {
    title: 'Design-System/data-display/Title',
    component: Title,
    parameters: {
      layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story: any) => (
            <ThemeProvider>
                <Box sx={{ width: "50vw", backgroundColor: "#292929", padding: "2em", borderRadius: "8px" }}>
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
        subtitle: 'Pickup were you left off',
        children: "Recently Player",
        isAbove: true
    },
};

export const Below: Story = {
    args: {
        subtitle: 'Pickup were you left off',
        children: "Recently Player",
        subtitleProps: { 
            isBold: true, 
            color: "tx-primary", 
            sx: { opacity: 0.8 } 
        },
    },
};

export const Marquee: Story = {
    args: {
        subtitle: 'Pickup were you left off. Pickup were you left off. Pickup were you left off. Pickup were you left off.',
        children: "Pickup were you left off. Pickup were you left off. Pickup were you left off. Pickup were you left off.",
        subtitleProps: { 
            isBold: true, 
            color: "tx-primary", 
            sx: { opacity: 0.8 } 
        },
        enableMarquee: true
    },
};

export const LoadingBelow: Story = {
    args: {
        subtitle: 'Pickup were you left off. Pickup were you left off. Pickup were you left off. Pickup were you left off.',
        children: "Pickup were you left off. Pickup were you left off. Pickup were you left off. Pickup were you left off.",
        subtitleProps: { 
            isBold: true, 
            color: "tx-primary", 
            sx: { opacity: 0.8 } 
        },
        enableMarquee: true,
        loading: true
    },
};

export const LoadingAbove: Story = {
    args: {
        subtitle: 'Pickup were you left off. Pickup were you left off. Pickup were you left off. Pickup were you left off.',
        children: "Pickup were you left off. Pickup were you left off. Pickup were you left off. Pickup were you left off.",
        loading: true,
        isAbove: true
    },
};
