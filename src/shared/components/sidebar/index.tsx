import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import { BaseSidebar, BaseSidebarSection, BaseSidebarItem } from '@design-system/components/navigation/base-sidebar';
import { Library } from '@components/sidebar/components/library';
import { useTheme } from '@design-system/theme';
import { Stack } from '@mui/material';
import { useAvailableHeight } from '@design-system/hooks/use-available-height';
import { BaseSidebarHeader } from '@design-system/components/navigation/base-sidebar/components/base-sidebar-header';
import { PropsWithChildren } from 'react';
import { Navbar } from '@components/navbar';
import { useTranslation } from 'react-i18next';
import { useUrlListener } from '@design-system/hooks/use-url-listener';
import { useIsMobile } from '@design-system/hooks';

export const Sidebar = (props: PropsWithChildren) => {    
    const { children } = props    

    const { spacing } = useTheme()
    const { t } = useTranslation()
    const isMobile = useIsMobile("md")
    
    const libraryMaxHeight = useAvailableHeight(250)
    const url = useUrlListener(["/"], true)

    const header = <BaseSidebarHeader/>

    const drawer = (
        <>
            <BaseSidebarSection>
                <BaseSidebarItem 
                    to="/" 
                    title={t("sidebar.home")}
                    inactiveIcon={HomeOutlinedIcon}
                    activeIcon={HomeRoundedIcon} 
                    isActive={url === 0}
                />
            </BaseSidebarSection>

            <BaseSidebarSection>
                <BaseSidebarItem 
                    title={t("sidebar.yourLibrary")}
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
                    padding: spacing(isMobile ? "in-sm" : "in-md"),
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