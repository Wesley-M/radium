import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import { BaseSidebar, BaseSidebarSection, BaseSidebarItem } from '@design-system/components/navigation/base-sidebar';
import { Library } from '@design-system/components/navigation/sidebar/components/library';
import { useTheme } from '@design-system/theme';
import { Stack } from '@mui/material';
import { useAvailableHeight } from '@design-system/hooks/use-available-height';
import { BaseSidebarHeader } from '@design-system/components/navigation/base-sidebar/components/base-sidebar-header';
import { PropsWithChildren } from 'react';
import { Navbar } from '@design-system/components/navigation/navbar';

export const Sidebar = (props: PropsWithChildren) => {    
    const { children } = props    

    const { spacing } = useTheme()
    const libraryMaxHeight = useAvailableHeight(235)

    const header = <BaseSidebarHeader/>

    const drawer = (
        <>
            <BaseSidebarSection>
                <BaseSidebarItem 
                    to="/" 
                    title="Home" 
                    activeIcon={HomeRoundedIcon} 
                    isActive
                />
            </BaseSidebarSection>

            <BaseSidebarSection>
                <BaseSidebarItem 
                    title="Your library" 
                    activeIcon={MusicNoteRoundedIcon} 
                    isActive
                />
                <Library maxHeight={libraryMaxHeight + "px"}/>
            </BaseSidebarSection>
        </>
    )
    return (
        <BaseSidebar header={header} content={drawer}>
            <Navbar/>
            <Stack
                gap={spacing("st-md")}
                sx={{
                    padding: spacing("in-md"),
                    paddingTop: spacing("st-xl", 1.5),
                    paddingBottom: spacing("st-xl", 2),
                    position: "relative"
                }}
            >
                {children}
            </Stack>
        </BaseSidebar>
    );
}