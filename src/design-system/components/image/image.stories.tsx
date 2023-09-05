import type { Meta, StoryObj } from '@storybook/react';
import { Image } from '.';
import { ThemeProvider } from '@design-system/theme';

const meta = {
    title: 'Components/Image',
    component: Image,
    parameters: {
      layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        width: { control: 'number' },
    },
    decorators: [
        (Story: any) => (
            <ThemeProvider>
                <Story />
            </ThemeProvider>
        ),
    ],
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AspectRatio3By4: Story = {
    args: {
        src: "https://picsum.photos/200/300",
        ratio: 3/4
    },
};

export const Fallback: Story = {
    args: {
        src: "https://broken.jpg"
    },
};

export const ProxyEnabled: Story = {
    args: {
        src: "https://picsum.photos/200/300",
        useProxy: true
    },
};

export const MaxWidth: Story = {
    args: {
        src: "https://picsum.photos/300/300",
        maxWidth: 200,
        width: 1000
    },
};

export const BorderRadius: Story = {
    args: {
        src: "https://picsum.photos/300/300",
        width: 200,
        maxWidth: 400,
        borderRadius: "xl"
    },
};

export const CustomHeight: Story = {
    args: {
        src: "https://picsum.photos/300/300",
        width: 200,
        height: 100,
        maxWidth: 400,
        borderRadius: "xxs"
    },
};