import { Link } from "react-router-dom"
import { ReactComponent as AppLogo } from '@design-system/assets/logo.svg';

export const Logo = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <Link to="/">
            <AppLogo {...props}/>
        </Link>
    )
}