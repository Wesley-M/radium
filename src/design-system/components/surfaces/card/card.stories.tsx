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
        size: 200,
        imageProps: {
          src: "https://picsum.photos/200/300"
        },
        title: "National Geographic",
        subtitle: "jazz, comedy, rock",
    },
};

export const Compact: Story = {
  args: {
      variant: "compact",
      imageProps: {
        src: "https://picsum.photos/200/300"
      },
      title: "National Geographic",
      subtitle: "jazz, comedy, rock",
  },
};

export const Minimal: Story = {
  args: {
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
      variant: "thumbnail",
      imageProps: {
        src: "https://picsum.photos/200/300"
      }
  },
};

export const BrokenImage: Story = {
  args: {
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
    size: 200,
    imageProps: {
      src: "https://picsum.photos/200/300"
    },
    title: "National Geographic",
    subtitle: "jazz, comedy, rock",
    loading: true
  },
};

export const LoadingCompact: Story = {
  args: {
    variant: "compact",
    imageProps: {
      src: "https://picsum.photos/200/300"
    },
    title: "National Geographic",
    subtitle: "jazz, comedy, rock",
    loading: true
  },
};

export const LoadingMinimal: Story = {
  args: {
    variant: "minimal",
    imageProps: {
      src: "https://picsum.photos/200/300"
    },
    title: "National Geographic",
    subtitle: "jazz, comedy, rock",
    loading: true
  },
};

export const LoadingThumbnail: Story = {
  args: {
    variant: "thumbnail",
    imageProps: {
      src: "https://picsum.photos/200/300"
    },
    title: "National Geographic",
    subtitle: "jazz, comedy, rock",
    loading: true
  },
};