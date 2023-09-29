import type { Meta, StoryObj } from '@storybook/react';
import { Section } from '.';
import { ThemeProvider } from '@design-system/theme';
import { Box } from '@mui/material';
import { Button } from '@design-system/components/inputs/button';
import { MemoryRouter } from 'react-router-dom';

const meta = {
    title: 'Design-System/data-display/Section',
    component: Section,
    parameters: {
      layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story: any) => (
            <ThemeProvider>
                <MemoryRouter>
                    <Box sx={{ width: "50vw", backgroundColor: "#292929", padding: "2em", borderRadius: "8px" }}>
                        <Story />
                    </Box>
                </MemoryRouter>
            </ThemeProvider>
        ),
    ],
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'A really long title',
        subtitle: 'Subtitle',
        actions: (
            <>
                <Button>Action 1</Button>
                <Button>Action 2</Button>
            </>
        ),
        children: (
            <Box 
                sx={{ 
                    width: "100%", 
                    height: "10vh", 
                    borderRadius: "0.5em", 
                    backgroundColor: "#fff" 
                }} 
            />
        ),
    },
};