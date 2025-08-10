import { CreateBreak, DeleteExtraBreaks, EditBreak } from './actions';
import { SessionsBreaks } from '../types';

type Props = {
    onBack?: () => void;
    breaks: number;
    breakTime: number;
    sessionId: number;
    onClose?: () => void;
    breaksData?: SessionsBreaks['breaks'];
};

export default function ModalPage2({
    breaks,
    breakTime,
    sessionId,
    onClose,
    breaksData,
}: Props) {
    if (!breaks) return;

    async function handleSubmit(formData: FormData) {
        if (breaksData) {
            // Päivitä olemassa olevat tauot
            for (let i = 0; i < Math.min(breaks, breaksData.length); i++) {
                const breakFormData = new FormData();
                const name =
                    formData.get(`name${i + 1}`)?.toString() ||
                    `Break ${i + 1}`;
                const length = formData.get(`length${i + 1}`)?.toString() || '';

                // Varmistetaan, että lähetämme oikeat avaimet palvelinpuolen toiminnolle.
                breakFormData.append(`name${i + 1}`, name);
                breakFormData.append(`length${i + 1}`, length);

                await EditBreak(breakFormData, sessionId, i + 1);
            }

            // Lisää uudet tauot, jos niitä tarvitaan
            if (breaks > breaksData.length) {
                for (let i = breaksData.length; i < breaks; i++) {
                    const breakFormData = new FormData();
                    const name =
                        formData.get(`name${i + 1}`)?.toString() ||
                        `Break ${i + 1}`;
                    const length =
                        formData.get(`length${i + 1}`)?.toString() || '';

                    // Varmistetaan, että lähetämme oikeat avaimet palvelinpuolen toiminnolle.
                    breakFormData.append(`name${i + 1}`, name);
                    breakFormData.append(`length${i + 1}`, length);

                    await CreateBreak(breakFormData, sessionId, i + 1);
                }
            }

            // Poista ylimääräiset tauot, jos käyttäjä vähensi määrää
            if (breaks < breaksData.length) {
                await DeleteExtraBreaks(sessionId, breaks);
            }
        } else {
            // Jos ei ole aiempaa dataa, luodaan kaikki breikit
            for (let i = 0; i < breaks; i++) {
                const breakFormData = new FormData();
                const name =
                    formData.get(`name${i + 1}`)?.toString() ||
                    `Break ${i + 1}`;
                const length = formData.get(`length${i + 1}`)?.toString() || '';

                // Varmistetaan, että lähetämme oikeat avaimet palvelinpuolen toiminnolle.
                breakFormData.append(`name${i + 1}`, name);
                breakFormData.append(`length${i + 1}`, length);

                await CreateBreak(breakFormData, sessionId, i + 1);
            }
        }

        onClose?.();
    }

    return (
        <main>
            <form>
                {Array.from({ length: breaks }, (_, i) => (
                    <div className="mb-4" key={i}>
                        <h2 className="font-bold">Break {i + 1}</h2>
                        <label
                            className="block text-sm font-medium text-gray-600"
                            htmlFor={`name${i + 1}`}
                        >
                            Break name
                        </label>
                        <input
                            className="mt-1 p-2 w-full h-8 border rounded-md"
                            type="text"
                            defaultValue={breaksData?.[i]?.name ?? ''}
                            name={`name${i + 1}`}
                            id={`name${i + 1}`}
                            maxLength={100}
                            required
                        />
                        <label
                            className="block text-sm font-medium text-gray-600 pt-2"
                            htmlFor={`length${i + 1}`}
                        >
                            Break length
                        </label>
                        <input
                            className="mt-1 p-2 w-full h-8 border rounded-md"
                            type="number"
                            name={`length${i + 1}`}
                            defaultValue={breaksData?.[i]?.length ?? ''}
                            placeholder="Minutes"
                            id={`length${i + 1}`}
                            max={breakTime - 1}
                            required
                        />
                    </div>
                ))}
                <div className="flex justify-end space-x-2 pt-5">
                    <button
                        className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                        type="submit"
                        formAction={handleSubmit}
                    >
                        Create
                    </button>
                </div>
            </form>
        </main>
    );
}
