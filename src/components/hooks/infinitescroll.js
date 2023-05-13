import { useEffect, useState } from 'react';
import { fetcher } from '../api/api_utils';

export default function useDocuments(pageNumber) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [docs, setDocs] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        let isMounted = true; // flag to keep track of whether the component is mounted
        setError(false);

        fetcher(`/api/gallery?page=${pageNumber}`).then(res => {
            if (isMounted) { // check if the component is still mounted
                setDocs(prevDocs => {
                    return [...new Set([...prevDocs, ...res.docs.map(doc => doc)])];
                });
                setHasMore(res.hasNextPage);
                setLoading(false);
            }
        }).catch(e => {
            if (isMounted) { // check if the component is still mounted
                setError(true);
                setLoading(false);
            }
        });

        return () => {
            isMounted = false; // cleanup function to cancel any ongoing requests
        };
    }, [pageNumber]);

    return { loading, error, docs, hasMore };
}
