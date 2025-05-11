interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const Editor = ({ value, onChange }: EditorProps) => {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full rounded-md border border-gray-300 min-h-[200px]"
      placeholder="Digite o conteúdo aqui..."
    />
  );
};
