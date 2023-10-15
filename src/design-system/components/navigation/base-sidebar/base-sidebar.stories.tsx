import type { Meta, StoryObj } from '@storybook/react';
import { BaseSidebar, BaseSidebarItem, BaseSidebarSection } from '.';
import { ThemeProvider } from '@design-system/theme';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import { Stack } from '@mui/material';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Design-System/navigation/BaseSidebar',
  component: BaseSidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <ThemeProvider>
        <MemoryRouter>
          <Story/>
        </MemoryRouter>
      </ThemeProvider>
    )
  ]
} satisfies Meta<typeof BaseSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
      content: (
        <>
          <BaseSidebarSection>
            <Stack direction="column" gap="1em">
              <BaseSidebarItem title="Home" activeIcon={HomeRoundedIcon} isActive/>
              <BaseSidebarItem title="Search" inactiveIcon={SearchRoundedIcon} />
            </Stack>
          </BaseSidebarSection>

          <BaseSidebarSection>
            <Stack direction="column" gap="1em">
              <BaseSidebarItem title="Your library" activeIcon={MusicNoteRoundedIcon} isActive/>
            </Stack>
          </BaseSidebarSection>
        </>
      )
    },
};