import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import { BaseSidebar, BaseSidebarSection, BaseSidebarItem, BaseSidebarProps } from '@design-system/components/navigation/base-sidebar';
import { Stack } from '@mui/material';
import { Library } from '@components/sidebar/components/library';

export const Sidebar = (props: Omit<BaseSidebarProps, 'children'>) => {    
    const { content } = props    

    // TODO: Replace static heights
    // TODO: Move this logic
    const getLibraryMaxHeight = () => {
        const playerHeight = 80
        const endY = window.innerHeight - playerHeight
        return (endY - 240) + "px"
    }

    return (
        <BaseSidebar content={content}>
            <BaseSidebarSection>
                <Stack gap="1em">
                    <BaseSidebarItem 
                        to="/" 
                        title="Home" 
                        icon={HomeRoundedIcon} 
                        isActive
                    />
                </Stack>
            </BaseSidebarSection>

            <BaseSidebarSection>
                <Stack>
                    <BaseSidebarItem 
                        title="Your library" 
                        icon={MusicNoteRoundedIcon} 
                        isActive
                    />
                    <Library maxHeight={getLibraryMaxHeight()}/>
                </Stack>
            </BaseSidebarSection>
        </BaseSidebar>
    );
}