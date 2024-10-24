import { ClerkProvider } from "@clerk/nextjs"


export const metadata = {
    title: "Threads",
    description: "A Next.js 13 meta threads Application "
}
import "../globals.css"




export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider >
            <html lang="en">
                <body className={` bg-dark-1`}>
                    <div className="w-full flex justify-center items-center min-h-screen">
                        {children}

                    </div>
                </body>
            </html>

        </ClerkProvider>
    )
}