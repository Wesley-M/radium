import SimpleBar from "simplebar-react";

interface ScrollProps {
    children: React.ReactNode
    maxHeight?: string | number
}

export const Scroll = (props: ScrollProps) => {
    const {
        children, 
        maxHeight = 200
    } = props
    
    return (
        <SimpleBar style={{ maxHeight }}>
            {children}
        </SimpleBar>
    )
}
