import React from "react";
import { UserProvider } from "./UserContext";
import { WatchEventsProvider } from "./WatchEventsContext";
import { ContentProvider } from "./ContentContext";
import { ContentStatusProvider } from "./ContentStatusContext";

function AppProvider({ children }) {
    return (
        <UserProvider>
            <WatchEventsProvider>
                <ContentProvider>
                    <ContentStatusProvider>
                        {children}
                    </ContentStatusProvider>
                </ContentProvider>
            </WatchEventsProvider>
        </UserProvider>
    )
}

export default AppProvider