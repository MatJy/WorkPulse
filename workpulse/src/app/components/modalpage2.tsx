import { CreateBreak } from './actions';
import { CreateWorkSession } from './actions';

type Props = {
    onBack?: () => void;
    breaks: number;
    breakTime: number;
    sessionId: number;
};

export default function ModalPage2({
    onBack,
    breaks,
    breakTime,
    sessionId,
}: Props) {
    if (!breaks) return;
    function handleBack() {
        if (onBack) {
            onBack();
        }
    }
    function handleSubmit(formData: FormData) {
        // CreateBreak(formData, sessionId);
        Array.from({ length: breaks }, (_, i) =>
            CreateBreak(formData, sessionId, i + 1)
        );
    }
    return (
        <main>
            <form>
                {Array.from({ length: breaks }, (_, i) => (
                    <div className="mb-4" key={i}>
                        <h2 className="font-bold">Break {i + 1}</h2>
                        <label
                            className="block text-sm font-medium text-gray-600"
                            htmlFor="name"
                        >
                            Break name
                        </label>
                        <input
                            className="mt-1 p-2 w-full h-8 border rounded-md"
                            type="text"
                            name="name"
                            id="name"
                            required
                        />
                        <label
                            className="block text-sm font-medium text-gray-600 pt-2"
                            htmlFor="length"
                        >
                            Break length
                        </label>
                        <input
                            className="mt-1 p-2 w-full h-8 border rounded-md"
                            type="number"
                            name="length"
                            placeholder="Minutes"
                            id="length"
                            max={breakTime - 1}
                            required
                        />
                    </div>
                ))}
                <div className="flex justify-end space-x-2 pt-5">
                    <button
                        className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                        type="submit"
                        onClick={handleBack}
                    >
                        Back
                    </button>
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
