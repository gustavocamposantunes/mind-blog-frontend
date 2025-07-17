interface IErrorMessage {
  error: Error
}

export const ErrorMessage: React.FC<IErrorMessage> = ({ error }) => (
  <div
    className="lg:col-span-2 xl:col-span-3  flex flex-col items-center gap-4 border-2 bg-stone-300 rounded-sm p-8 text-4xl text-red-500 font-semibold"
    data-testid="error-message"
  >
    {error.message}
  </div>
)
