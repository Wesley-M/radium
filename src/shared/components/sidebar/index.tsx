import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import { BaseSidebar, BaseSidebarSection, BaseSidebarItem, BaseSidebarProps } from '@design-system/components/navigation/base-sidebar';
import { Stack } from '@mui/material';
import { Library } from '@components/sidebar/components/library';
import { useState } from 'react';
import { useTheme } from '@design-system/theme';

export const Sidebar = (props: Omit<BaseSidebarProps, 'children'>) => {    
    const { content } = props    

    const { theme } = useTheme()
    
    const getLibraryMaxHeight = () => {
        const playerHeight = parseInt(theme("components.player.compact.height"))
        const endY = window.innerHeight - playerHeight
        return (endY - 235) + "px"
    }

    const handleLibraryMaxHeight = () => {
        setLibraryMaxHeight(getLibraryMaxHeight())
    }

    const [libraryMaxHeight, setLibraryMaxHeight] = useState(getLibraryMaxHeight())

    return (
        <BaseSidebar content={content} onResize={handleLibraryMaxHeight}>
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
                    <Library maxHeight={libraryMaxHeight}/>
                </Stack>
            </BaseSidebarSection>
        </BaseSidebar>
    );
}