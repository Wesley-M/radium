import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '.';
import { ThemeProvider } from '@design-system/theme';
import { Box } from '@mui/material';

const meta = {
    title: 'Components/Text',
    component: Text,
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
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Radium is a new radio streaming platform!',
    },
};

export const H1: Story = {
    args: {
        children: 'Radium is a new radio streaming platform!',
        as: "h1",
    },
};

export const H2: Story = {
    args: {
        children: 'Radium is a new radio streaming platform!',
        as: "h2",
    },
};

export const H3: Story = {
    args: {
        children: 'Radium is a new radio streaming platform!',
        as: "h3",
    },
};

export const H4: Story = {
    args: {
        children: 'Radium is a new radio streaming platform!',
        as: "h4",
    },
};

export const H5: Story = {
    args: {
        children: 'Radium is a new radio streaming platform!',
        as: "h5",
    },
};

export const H6: Story = {
    args: {
        children: 'Radium is a new radio streaming platform!',
        as: "h6",
    },
};

export const Body1: Story = {
    args: {
        children: 'Radium is a new radio streaming platform!',
        as: "body1",
    },
};

export const Body2: Story = {
    args: {
        children: 'Radium is a new radio streaming platform!',
        as: "body2",
    },
};

export const Uppercase: Story = {
    args: {
        children: 'Radium is a new radio streaming platform!',
        isUppercase: true,
    },
};