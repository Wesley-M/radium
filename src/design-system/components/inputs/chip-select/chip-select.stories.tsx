import type { Meta, StoryObj } from '@storybook/react';
import { ChipSelect } from '.';
import { ThemeProvider } from '@design-system/theme';
import { Box } from '@mui/material';

const meta = {
  title: 'Design-System/inputs/ChipSelect',
  component: ChipSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <ThemeProvider>
          <Box 
            sx={{ 
              backgroundColor: "#1A1A1A", 
              padding: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "1rem"
            }}
          >
              <Story />
          </Box>
      </ThemeProvider>
    )
  ]
} satisfies Meta<typeof ChipSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleSelect: Story = {
    args: {
      items: [
        {label: "Item 1", value: "item1"},
        {label: "Item 2", value: "item2"},
        {label: "Item 3", value: "item3"},
      ],
      onChange: (value: string) => console.log(value)
    },
};

export const MultipleSelect: Story = {
  args: {
    items: [
      {label: "Item 1", value: "item1"},
      {label: "Item 2", value: "item2"},
      {label: "Item 3", value: "item3"},
    ],
    multiple: true,
    onChange: (values: string[]) => console.log(values)
  },
};

export const SelectAtLeastOneWithMultipleSelect: Story = {
  args: {
    items: [
      {label: "Item 1", value: "item1"},
      {label: "Item 2", value: "item2"},
      {label: "Item 3", value: "item3"},
    ],
    multiple: true,
    atLeastOne: true,
    onChange: (values: string[]) => console.log(values)
  },
};

export const SelectAtLeastOneWithSingleSelect: Story = {
  args: {
    items: [
      {label: "Item 1", value: "item1"},
      {label: "Item 2", value: "item2"},
      {label: "Item 3", value: "item3"},
    ],
    multiple: false,
    atLeastOne: true,
    onChange: (v: string) => console.log(v)
  },
};