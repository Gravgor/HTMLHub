import Footer from "../components/Footer"
import ProvidersWrapper from "./ProvidersWrapper"
export default function DashboardLayout({
    children,
    }:{
    children: React.ReactNode,
}) {
    return (
        <html>
            <head />
            <body>
                <ProvidersWrapper>
                   {children}
                </ProvidersWrapper>
            </body>
        </html>
    )
}