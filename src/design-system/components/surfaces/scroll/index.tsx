import SimpleBar from "simplebar-react";

interface ScrollProps {
    id?: string
    children: React.ReactNode
    maxHeight?: string | number
}

export const Scroll = (props: ScrollProps) => {
    const {
        id,
        children, 
        maxHeight = 200
    } = props
    
    return (
        <SimpleBar id={id} style={{ maxHeight }}>
            {children}
        </SimpleBar>
    )
}
