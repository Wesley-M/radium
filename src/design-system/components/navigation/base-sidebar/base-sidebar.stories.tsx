import type { Meta, StoryObj } from '@storybook/react';
import { BaseSidebar, BaseSidebarItem, BaseSidebarSection } from '.';
import { ThemeProvider } from '@design-system/theme';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import { Stack } from '@mui/material';

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
        <Story/>
      </ThemeProvider>
    )
  ]
} satisfies Meta<typeof BaseSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
      children: (
        <>
          <BaseSidebarSection>
            <Stack direction="column" gap="1em">
              <BaseSidebarItem title="Home" icon={HomeRoundedIcon} isActive/>
              <BaseSidebarItem title="Search" icon={SearchRoundedIcon} />
            </Stack>
          </BaseSidebarSection>

          <BaseSidebarSection>
            <Stack direction="column" gap="1em">
              <BaseSidebarItem title="Your library" icon={MusicNoteRoundedIcon} isActive/>
            </Stack>
          </BaseSidebarSection>
        </>
      )
    },
};

/** 
 * <Sidebar onMiniDrawerChange={setMiniDrawer} enableMiniDrawer>
 *  <SidebarSection title="" icon="">
 *    <SidebarItem title="" icon="" />
 *    <SidebarItem title="" icon="" />
 *  </SidebarSection>
 *  <SidebarSection title="Your Library" icon="">
 *    <CardList collapse={isMiniDrawer}/>
 *  </SidebarSection>
 * </Sidebar>
*/