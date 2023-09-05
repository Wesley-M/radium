import type { Meta, StoryObj } from '@storybook/react';
import { SmartGrid, Item } from '.';
import { Box } from '@mui/material';
import { ThemeProvider } from '@design-system/theme';
import { Card } from '@design-system/components/card';

const meta = {
  title: 'Components/SmartGrid',
  component: SmartGrid,
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
            border: "4px solid #333333",
            borderRadius: "5px", 
            padding: "1em"
          }}
        >
          <Story/>
        </Box>
      </ThemeProvider>
    )
  ]
} satisfies Meta<typeof SmartGrid>;

export default meta;
type Story = StoryObj<typeof meta>;
  
// Mock grid items
const mockItems = (n: number) => {
  return new Array(n).fill(0).map(
    (_, i) => (
      <Item>
        <Card
          title={`Radio Station ${i}`}
          subtitle="Gender 1, Gender 2, Gender 3, Gender 4, Gender 5"
          imageProps={{ src: "https://picsum.photos/id/247/500/500" }}
          padding="sm"
          borderRadius='md'
        />
      </Item>
    )
  )
}

// Mock compact grid items
const mockCompactItems = (n: number) => {
  return new Array(n).fill(0).map(
    (_, i) => (
      <Item>
        <Card
          title={`Radio Station ${i}`}
          subtitle="Gender 1, Gender 2, Gender 3, Gender 4, Gender 5"
          imageProps={{ src: "https://picsum.photos/id/247/500/500", hasRinglight: true, borderRadius: "xxs" }}
          borderRadius="xxs"
          padding="xxs"
          variant="compact"
        />
      </Item>
    )
  )
}

export const OneLineFit: Story = {
  args: {
    children: mockItems(5),
    variant: "fit-x"
  },
};

export const FullGrid: Story = {
  args: {
    children: mockItems(5),
    variant: "fit-xy"
  },
};

export const Fill: Story = {
  args: {
    children: mockCompactItems(2),
    variant: "fill-xy",
    itemProps: { minWidth: 250 }
  },
};

export const SlideShow: Story = {
  args: {
    children: mockItems(5),
    variant: "overflow-x"
  },
};

export const AspectRatioEnabled: Story = {
  args: {
    children: mockItems(5),
    enableAspectRatio: true
  },
};

export const XsGap: Story = {
  args: {
    children: mockItems(5),
    itemProps: { gap: "xs" }
  },
};