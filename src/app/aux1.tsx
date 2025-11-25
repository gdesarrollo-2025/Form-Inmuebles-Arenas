

const handleDireccionChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;
  setDireccion((prev) => ({ ...prev, [name]: value }));
};

const handleLocation = async (): Promise<void> => {
  const { lat, lon }: LocatorResult = await getCoords(
    `${dirParcial}, ${city}, ${country}`
  );

  setCoords((prev) => ({ ...prev, lat, lon }));
};