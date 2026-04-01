const SpanError = ({error}: {error: string}) => {
  return (
    <span
      id="SpanError"
      className="pl-5 mt-2 block text-sm text-destructive"
    >
      {error}
    </span>
  );
};

export { SpanError };