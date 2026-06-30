interface Props {
    filename: string;
}

export default function UploadSuccess({
    filename,
}: Props) {
    return (
        <div className="mt-6 rounded-lg bg-green-100 p-4">

            <h3 className="font-semibold text-green-700">
                Upload Successful
            </h3>

            <p className="mt-1 text-green-600">
                {filename} uploaded successfully.
            </p>

        </div>
    );
}