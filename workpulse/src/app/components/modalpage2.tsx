import { CreateBreak } from './actions';

type Props = {
    onBack?: () => void;
    breaks: number;
    breakTime: number;
    sessionId: number;
    onClose?: () => void;
};

export default function ModalPage2({
    breaks,
    breakTime,
    sessionId,
    onClose,
}: Props) {
    if (!breaks) return;

    // function handleBack() {
    //     if (onBack) {
    //         onBack();
    //     }
    // }

    function handleSubmit(formData: FormData) {
        Array.from({ length: breaks }, (_, i) =>
            CreateBreak(formData, sessionId, i + 1)
        );
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
                            name={`name${i + 1}`}
                            id={`name${i + 1}`}
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
