import { SyntheticEvent, useState } from 'react';
import { geoCode } from '../../utils/geocoding';
import { Btn } from '../common/Btn';
import './AddForm.css';

export const AddForm = () => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');

    const [form, setForm] = useState({
        name: '',
        description: '',
        price: 0,
        url: '',
        adress: '',
    });

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    const saveAd = async (e: SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const { lat, lon } = await geoCode(form.adress);

            const res = await fetch(`http://localhost:3001/ad`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...form,
                    lat,
                    lon,
                }),
            });

            const data = await res.json();

            setId(data.id);
        } finally {
            setLoading(false);
        }


    };

    if (loading) {
        return <h2>Trwa dodawanie ogłoszenia...</h2>
    }

    if (id) {
        return <h2>Twoje ogłoszenie "${form.name}" zostało poprawnie dodano do serwisu pod ID: {id}</h2>
    }

    return <form className="add-form" onSubmit={saveAd}>
        <h1>Dodawanie ogłoszeniaa</h1>
        <p>
            <label>Nazwa: <br />
                <input type="text" name="name" required maxLength={99} value={form.name} onChange={e => updateForm('name', e.target.value)} />
            </label>
        </p>
        <p>
            <label>Opis: <br />
                <textarea name="description" maxLength={999} value={form.description} onChange={e => updateForm('description', e.target.value)} />
            </label>
        </p>
        <p>
            <label>Cena: <br />
                <input type="number" name="price" value={form.price} onChange={e => updateForm('price', Number(e.target.value))} />
                <small>Pozostaw 0, aby nie wyświetlać w polu</small>
            </label>
        </p>
        <p>
            <label>Adres URL: <br />
                <input type="url" name="url" maxLength={99} value={form.url} onChange={e => updateForm('url', e.target.value)} />
            </label>
        </p>
        <p>
            <label>Adres fizyczny na mapie: <br />
                <input type="text" name="adress" required maxLength={99} value={form.adress} onChange={e => updateForm('adress', e.target.value)} />
            </label>
        </p>
        <Btn text='Zapisz' />
    </form>;
}