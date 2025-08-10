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

    function handleSubmit(formData: FormData) {
        if (breaksData) {
            // Päivitä vain olemassa olevat breikit
            Array.from(
                { length: Math.min(breaks, breaksData.length) },
                (_, i) => {
                    EditBreak(formData, breaksData[i].session_id, i + 1);
                }
            );

            // Lisää uudet breikit, jos niitä tarvitaan
            if (breaks > breaksData.length) {
                Array.from({ length: breaks - breaksData.length }, (_, i) => {
                    const newIndex = breaksData.length + i + 1;
                    CreateBreak(formData, breaksData[0].session_id, newIndex);
                });
            }

            // Poista ylimääräiset, jos käyttäjä vähensi määrää
            if (breaks < breaksData.length) {
                DeleteExtraBreaks(breaksData[0].session_id, breaks);
            }
        } else {
            // Jos ei ole aiempaa dataa, luodaan kaikki breikit
            Array.from({ length: breaks }, (_, i) => {
                CreateBreak(formData, sessionId, i + 1);
            });
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
                            defaultValue={breaksData?.[i].length}
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
