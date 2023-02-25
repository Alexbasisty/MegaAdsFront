import { useEffect, useState } from "react";
import { AdEntity } from "types";

interface Props {
    id: string;
}

export const SingleAd = (props: Props) => {
    const [ad, setAd] = useState<AdEntity | null>(null);

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3001/ad/${props.id}`);
            const data = await res.json();

            setAd(data);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (ad === null) {
        return <p>Wczytywanie...</p>
    }

    return <>
        <h2>{ad.name}</h2>
        <p>{ad.description}</p>
        {!!ad.price && <p>{ad.price} PLN</p>}
        <hr />
        <a href={ad.url} target="_blank" rel="noreferrer">Otwórz ogłoszenie</a>
    </>;
}