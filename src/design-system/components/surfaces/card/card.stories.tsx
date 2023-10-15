import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '.';
import { ThemeProvider } from '@design-system/theme';
import { Box } from '@mui/material';

const meta = {
  title: 'Design-System/surfaces/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <ThemeProvider>
          <Box sx={{ backgroundColor: "#292929", padding: "4em" }}>
            <Story />
          </Box>
      </ThemeProvider>
    )
  ]
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        width: 200,
        height: 250,
        imageProps: {
          src: "https://picsum.photos/200/300"
        },
        title: "National Geographic",
        subtitle: "jazz, comedy, rock",
    },
};

export const Compact: Story = {
  args: {
      width: 300,
      height: 80,
      variant: "compact",
      imageProps: {
        src: "https://picsum.photos/200/300"
      },
      title: "National Geographic",
      subtitle: "jazz, comedy, rock",
      enableMarquee: true
  },
};

export const Minimal: Story = {
  args: {
      width: 300,
      height: 80,
      variant: "minimal",
      imageProps: {
        src: "https://picsum.photos/200/300"
      },
      title: "National Geographic",
      subtitle: "jazz, comedy, rock",
  },
};

export const Thumbnail: Story = {
  args: {
      width: 90,
      height: 90,
      variant: "thumbnail",
      imageProps: {
        src: "https://picsum.photos/200/300"
      }
  },
};

export const BrokenImage: Story = {
  args: {
      width: 200,
      height: 250,
      variant: "default",
      imageProps: {
        src: "https://picsum.phot"
      },
      title: "National Geographic",
      subtitle: "jazz, comedy, rock",
  },
};

export const Square: Story = {
  args: {
      width: 250,
      height: 250,
      variant: "default",
      borderRadius: "xxs",
      imageProps: {
        src: "https://picsum.photos/300",
        borderRadius: "xxs"
      },
      title: "National Geographic",
      subtitle: "jazz, comedy, rock",
  },
};

export const LoadingDefault: Story = {
  args: {
    width: 200,
    height: 250,
    imageProps: {
      src: "https://picsum.photos/200/300"
    },
    title: "National Geographic",
    subtitle: "jazz, comedy, rock",
    loading: true,
    hideWhileEmpty: false
  },
};

export const LoadingCompact: Story = {
  args: {
    width: 300,
    height: 80,
    variant: "compact",
    imageProps: {
      src: "https://picsum.photos/200/300"
    },
    title: "National Geographic",
    subtitle: "jazz, comedy, rock",
    loading: true,
    hideWhileEmpty: false
  },
};

export const LoadingMinimal: Story = {
  args: {
    width: 300,
    height: 80,
    variant: "minimal",
    imageProps: {
      src: "https://picsum.photos/200/300"
    },
    title: "National Geographic",
    subtitle: "jazz, comedy, rock",
    loading: true,
    hideWhileEmpty: false
  },
};

export const LoadingThumbnail: Story = {
  args: {
    width: 90,
    height: 90,
    variant: "thumbnail",
    imageProps: {
      src: "https://picsum.photos/200/300"
    },
    title: "National Geographic",
    subtitle: "jazz, comedy, rock",
    loading: true,
    hideWhileEmpty: false
  },
};