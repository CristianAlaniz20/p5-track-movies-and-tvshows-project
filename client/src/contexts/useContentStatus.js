import { useContext, useMemo } from "react";
import { WatchEventsContext } from "../context/WatchEventsContext";

const useContentStatus = () => {
    const { watchEvents } = useContext(WatchEventsContext);

    const watchedMovies = useMemo(() => {
        return watchEvents
            .filter(event => event.movie && event.status === "watched")
            .map(event => event.movie);
    }, [watchEvents]);

    const watchlistMovies = useMemo(() => {
        return watchEvents
            .filter(event => event.movie && event.status === "watchlist")
            .map(event => event.movie);
    }, [watchEvents]);

    const watchedTVShows = useMemo(() => {
        return watchEvents
            .filter(event => event.tv_show && event.status === "watched")
            .map(event => event.tv_show);
    }, [watchEvents]);

    const watchlistTVShows = useMemo(() => {
        return watchEvents
            .filter(event => event.tv_show && event.status === "watchlist")
            .map(event => event.tv_show);
    }, [watchEvents]);

    return { watchedMovies, watchlistMovies, watchedTVShows, watchlistTVShows };
};

export default useContentStatus;
