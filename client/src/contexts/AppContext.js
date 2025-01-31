import React from "react";
import { UserProvider } from "./UserContext";
import { WatchEventsProvider } from "./WatchEventsContext";
import { ContentProvider } from "./ContentContext";

function AppProvider({ children }) {
    return (
        <UserProvider>
            <WatchEventsProvider>
                <ContentProvider>
                    {children}
                </ContentProvider>
            </WatchEventsProvider>
        </UserProvider>
    );
}

export default AppProvider;