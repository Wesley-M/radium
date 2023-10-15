import type { Meta, StoryObj } from '@storybook/react';
import { ErrorIndicator } from '.';
import { ThemeProvider } from '@design-system/theme';
import { Box } from '@mui/material';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

const meta = {
    title: 'Design-System/data-display/ErrorIndicator',
    component: ErrorIndicator,
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
        ),
    ],
} satisfies Meta<typeof ErrorIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        icon: <ErrorOutlineRoundedIcon sx={{ width: "100%", height: "100%", color: "white" }}/>,
        title: "Something went wrong",
        subtitle: "Please try again later",
        buttonProps: {
            children: "Retry",
        },
        enableButton: true
    },
};