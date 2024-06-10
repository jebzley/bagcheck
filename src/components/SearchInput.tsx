interface Props {
  id: string;
}

export function SearchInput({ id }: Props) {
  return (
    <>
      <input
        required
        className="border rounded p-1 w-full"
        type="search"
        placeholder="Poopy"
        name={id}
        id={id}
        list={`list${id}`}
      />
      <datalist id={`list${id}`}>
        <option value="butt" />
      </datalist>
    </>
  );
}
